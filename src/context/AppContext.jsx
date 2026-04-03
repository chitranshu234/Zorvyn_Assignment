import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext(null);

const VALID_ROLES = ['admin', 'viewer'];
const STORAGE_KEY = 'finDash_state';

// safely validates a single transaction object
function isValidTransaction(t) {
  return (
    t &&
    typeof t.id === 'string' &&
    typeof t.date === 'string' &&
    typeof t.description === 'string' &&
    typeof t.amount === 'number' && t.amount >= 0 &&
    typeof t.category === 'string' &&
    ['income', 'expense'].includes(t.type)
  );
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // validate saved data before trusting it
    const transactions = Array.isArray(parsed.transactions)
      ? parsed.transactions.filter(isValidTransaction)
      : initialTransactions;

    const role = VALID_ROLES.includes(parsed.role) ? parsed.role : 'admin';
    const darkMode = typeof parsed.darkMode === 'boolean' ? parsed.darkMode : false;

    return { transactions, role, darkMode, sidebarOpen: true };
  } catch (err) {
    console.warn('Could not load saved state, using defaults.', err);
    return null;
  }
}

const defaults = {
  transactions: initialTransactions,
  role: 'admin',
  darkMode: false,
  sidebarOpen: true,
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
    dateFrom: '',
    dateTo: '',
  },
};

const initialState = loadSavedState() || defaults;
// filters always reset on fresh load
initialState.filters = { ...defaults.filters };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE': {
      const role = VALID_ROLES.includes(action.payload) ? action.payload : state.role;
      return { ...state, role };
    }

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };

    case 'RESET_FILTERS':
      return { ...state, filters: { ...defaults.filters } };

    case 'ADD_TRANSACTION':
      if (!isValidTransaction(action.payload)) return state;
      return { ...state, transactions: [action.payload, ...state.transactions] };

    case 'UPDATE_TRANSACTION':
      if (!isValidTransaction(action.payload)) return state;
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // persist to localStorage whenever relevant state changes
  useEffect(() => {
    try {
      const toSave = {
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (err) {
      // localStorage might be full or blocked
      console.warn('Failed to persist state:', err);
    }
  }, [state.transactions, state.role, state.darkMode]);

  // sync dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  const getFilteredTransactions = useCallback(() => {
    let result = [...state.transactions];
    const { search, category, type, sortBy, sortOrder, dateFrom, dateTo } = state.filters;

    if (search) {
      const query = search.toLowerCase().trim();
      result = result.filter(t =>
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    if (category !== 'all') {
      result = result.filter(t => t.category === category);
    }

    if (type !== 'all') {
      result = result.filter(t => t.type === type);
    }

    if (dateFrom) result = result.filter(t => t.date >= dateFrom);
    if (dateTo) result = result.filter(t => t.date <= dateTo);

    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') cmp = a.date.localeCompare(b.date);
      else if (sortBy === 'amount') cmp = a.amount - b.amount;
      else if (sortBy === 'category') cmp = a.category.localeCompare(b.category);
      return sortOrder === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [state.transactions, state.filters]);

  const contextValue = {
    ...state,
    dispatch,
    filteredTransactions: getFilteredTransactions(),
    isAdmin: state.role === 'admin',
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>');
  return ctx;
}
