import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { Search, X, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

export default function TransactionFilters() {
  const { filters, dispatch } = useAppContext();

  const setFilter = (key, value) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  };

  const hasActiveFilters = filters.search || filters.category !== 'all' || filters.type !== 'all' || filters.dateFrom || filters.dateTo;

  return (
    <div className="dash-card p-4 mb-4 animate-fade-in">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-800 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={16} className="text-surface-400 flex-shrink-0" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            placeholder="Search transactions..."
            className="bg-transparent text-sm text-surface-700 dark:text-surface-300 placeholder-surface-400 outline-none w-full"
          />
          {filters.search && (
            <button onClick={() => setFilter('search', '')} className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filter */}
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
          className="appearance-none bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl px-3 py-2 text-sm text-surface-700 dark:text-surface-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Categories</option>
          {Object.keys(CATEGORIES).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Type filter */}
        <select
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value)}
          className="appearance-none bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl px-3 py-2 text-sm text-surface-700 dark:text-surface-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Sort */}
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            setFilter('sortBy', sortBy);
            setFilter('sortOrder', sortOrder);
          }}
          className="appearance-none bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl px-3 py-2 text-sm text-surface-700 dark:text-surface-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
          <option value="category-asc">Category A-Z</option>
        </select>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilter('dateFrom', e.target.value)}
            className="bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl px-3 py-2 text-sm text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-surface-400 text-xs">to</span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilter('dateTo', e.target.value)}
            className="bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl px-3 py-2 text-sm text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
