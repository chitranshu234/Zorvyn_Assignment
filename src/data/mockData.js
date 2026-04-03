// category definitions with display colors
export const CATEGORIES = {
  'Food & Dining': { color: '#f97316', bgLight: '#fff7ed', bgDark: '#431407' },
  'Shopping': { color: '#ec4899', bgLight: '#fdf2f8', bgDark: '#500724' },
  'Transport': { color: '#3b82f6', bgLight: '#eff6ff', bgDark: '#172554' },
  'Entertainment': { color: '#8b5cf6', bgLight: '#f5f3ff', bgDark: '#2e1065' },
  'Bills & Utilities': { color: '#f43f5e', bgLight: '#fff1f2', bgDark: '#4c0519' },
  'Healthcare': { color: '#14b8a6', bgLight: '#f0fdfa', bgDark: '#042f2e' },
  'Education': { color: '#6366f1', bgLight: '#eef2ff', bgDark: '#1e1b4b' },
  'Salary': { color: '#10b981', bgLight: '#ecfdf5', bgDark: '#022c22' },
  'Freelance': { color: '#22d3ee', bgLight: '#ecfeff', bgDark: '#083344' },
  'Investments': { color: '#a855f7', bgLight: '#faf5ff', bgDark: '#3b0764' },
  'Rent': { color: '#ef4444', bgLight: '#fef2f2', bgDark: '#450a0a' },
  'Groceries': { color: '#84cc16', bgLight: '#f7fee7', bgDark: '#1a2e05' },
  'Subscriptions': { color: '#e879f9', bgLight: '#fdf4ff', bgDark: '#4a044e' },
  'Travel': { color: '#0ea5e9', bgLight: '#f0f9ff', bgDark: '#0c4a6e' },
  'Gifts': { color: '#fb923c', bgLight: '#fff7ed', bgDark: '#431407' },
};

let _id = 1;
const nextId = () => `txn_${String(_id++).padStart(4, '0')}`;

export const initialTransactions = [
  // jan 2026
  { id: nextId(), date: '2026-01-02', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income' },
  { id: nextId(), date: '2026-01-03', description: 'Apartment Rent', amount: 1800, category: 'Rent', type: 'expense' },
  { id: nextId(), date: '2026-01-04', description: 'Grocery Store', amount: 125.50, category: 'Groceries', type: 'expense' },
  { id: nextId(), date: '2026-01-05', description: 'Netflix Subscription', amount: 15.99, category: 'Subscriptions', type: 'expense' },
  { id: nextId(), date: '2026-01-07', description: 'Uber Ride', amount: 24.50, category: 'Transport', type: 'expense' },
  { id: nextId(), date: '2026-01-08', description: 'Freelance Project Payment', amount: 1200, category: 'Freelance', type: 'income' },
  { id: nextId(), date: '2026-01-10', description: 'Electric Bill', amount: 95.00, category: 'Bills & Utilities', type: 'expense' },
  { id: nextId(), date: '2026-01-12', description: 'Restaurant Dinner', amount: 68.40, category: 'Food & Dining', type: 'expense' },
  { id: nextId(), date: '2026-01-14', description: 'Online Course', amount: 49.99, category: 'Education', type: 'expense' },
  { id: nextId(), date: '2026-01-16', description: 'Movie Tickets', amount: 32.00, category: 'Entertainment', type: 'expense' },

  // feb 2026
  { id: nextId(), date: '2026-02-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income' },
  { id: nextId(), date: '2026-02-02', description: 'Apartment Rent', amount: 1800, category: 'Rent', type: 'expense' },
  { id: nextId(), date: '2026-02-04', description: 'Grocery Shopping', amount: 142.30, category: 'Groceries', type: 'expense' },
  { id: nextId(), date: '2026-02-05', description: 'Spotify Premium', amount: 11.99, category: 'Subscriptions', type: 'expense' },
  { id: nextId(), date: '2026-02-06', description: 'Gas Station', amount: 52.00, category: 'Transport', type: 'expense' },
  { id: nextId(), date: '2026-02-08', description: 'Doctor Visit', amount: 150.00, category: 'Healthcare', type: 'expense' },
  { id: nextId(), date: '2026-02-10', description: 'Freelance Web Design', amount: 2500, category: 'Freelance', type: 'income' },
  { id: nextId(), date: '2026-02-12', description: 'Valentine Dinner', amount: 120.50, category: 'Food & Dining', type: 'expense' },
  { id: nextId(), date: '2026-02-14', description: 'Gift for Partner', amount: 85.00, category: 'Gifts', type: 'expense' },
  { id: nextId(), date: '2026-02-18', description: 'Internet Bill', amount: 69.99, category: 'Bills & Utilities', type: 'expense' },
  { id: nextId(), date: '2026-02-20', description: 'New Shoes', amount: 129.99, category: 'Shopping', type: 'expense' },
  { id: nextId(), date: '2026-02-22', description: 'Stock Dividend', amount: 340.00, category: 'Investments', type: 'income' },

  // mar 2026
  { id: nextId(), date: '2026-03-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income' },
  { id: nextId(), date: '2026-03-02', description: 'Apartment Rent', amount: 1800, category: 'Rent', type: 'expense' },
  { id: nextId(), date: '2026-03-03', description: 'Grocery Store', amount: 98.75, category: 'Groceries', type: 'expense' },
  { id: nextId(), date: '2026-03-05', description: 'Netflix + Spotify', amount: 27.98, category: 'Subscriptions', type: 'expense' },
  { id: nextId(), date: '2026-03-06', description: 'Bus Pass Monthly', amount: 75.00, category: 'Transport', type: 'expense' },
  { id: nextId(), date: '2026-03-08', description: 'Concert Tickets', amount: 150.00, category: 'Entertainment', type: 'expense' },
  { id: nextId(), date: '2026-03-10', description: 'Phone Bill', amount: 55.00, category: 'Bills & Utilities', type: 'expense' },
  { id: nextId(), date: '2026-03-12', description: 'Freelance App Dev', amount: 3200, category: 'Freelance', type: 'income' },
  { id: nextId(), date: '2026-03-14', description: 'Pizza Night', amount: 42.00, category: 'Food & Dining', type: 'expense' },
  { id: nextId(), date: '2026-03-16', description: 'New Laptop Case', amount: 45.99, category: 'Shopping', type: 'expense' },
  { id: nextId(), date: '2026-03-18', description: 'Pharmacy', amount: 28.50, category: 'Healthcare', type: 'expense' },
  { id: nextId(), date: '2026-03-20', description: 'Udemy Course', amount: 14.99, category: 'Education', type: 'expense' },
  { id: nextId(), date: '2026-03-22', description: 'Weekend Trip', amount: 350.00, category: 'Travel', type: 'expense' },
  { id: nextId(), date: '2026-03-25', description: 'Investment Return', amount: 580.00, category: 'Investments', type: 'income' },
  { id: nextId(), date: '2026-03-28', description: 'Water Bill', amount: 42.00, category: 'Bills & Utilities', type: 'expense' },

  // apr 2026 (partial)
  { id: nextId(), date: '2026-04-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income' },
  { id: nextId(), date: '2026-04-01', description: 'Apartment Rent', amount: 1800, category: 'Rent', type: 'expense' },
  { id: nextId(), date: '2026-04-02', description: 'Grocery Run', amount: 110.25, category: 'Groceries', type: 'expense' },
  { id: nextId(), date: '2026-04-02', description: 'Coffee Shop', amount: 12.50, category: 'Food & Dining', type: 'expense' },
  { id: nextId(), date: '2026-04-03', description: 'Uber Eats', amount: 35.80, category: 'Food & Dining', type: 'expense' },

  // nov 2025
  { id: nextId(), date: '2025-11-01', description: 'Monthly Salary', amount: 8200, category: 'Salary', type: 'income' },
  { id: nextId(), date: '2025-11-03', description: 'Apartment Rent', amount: 1800, category: 'Rent', type: 'expense' },
  { id: nextId(), date: '2025-11-05', description: 'Black Friday Shopping', amount: 450.00, category: 'Shopping', type: 'expense' },
  { id: nextId(), date: '2025-11-10', description: 'Grocery Store', amount: 167.80, category: 'Groceries', type: 'expense' },
  { id: nextId(), date: '2025-11-15', description: 'Flight Tickets', amount: 580.00, category: 'Travel', type: 'expense' },
  { id: nextId(), date: '2025-11-20', description: 'Freelance Logo Design', amount: 800, category: 'Freelance', type: 'income' },
  { id: nextId(), date: '2025-11-25', description: 'Electric Bill', amount: 110.00, category: 'Bills & Utilities', type: 'expense' },

  // dec 2025
  { id: nextId(), date: '2025-12-01', description: 'Monthly Salary', amount: 8200, category: 'Salary', type: 'income' },
  { id: nextId(), date: '2025-12-02', description: 'Apartment Rent', amount: 1800, category: 'Rent', type: 'expense' },
  { id: nextId(), date: '2025-12-05', description: 'Christmas Gifts', amount: 320.00, category: 'Gifts', type: 'expense' },
  { id: nextId(), date: '2025-12-08', description: 'Holiday Groceries', amount: 215.40, category: 'Groceries', type: 'expense' },
  { id: nextId(), date: '2025-12-10', description: 'Year End Bonus', amount: 3000, category: 'Salary', type: 'income' },
  { id: nextId(), date: '2025-12-12', description: 'Winter Jacket', amount: 189.99, category: 'Shopping', type: 'expense' },
  { id: nextId(), date: '2025-12-15', description: 'Holiday Party', amount: 95.00, category: 'Entertainment', type: 'expense' },
  { id: nextId(), date: '2025-12-20', description: 'Dental Checkup', amount: 200.00, category: 'Healthcare', type: 'expense' },
  { id: nextId(), date: '2025-12-22', description: 'Ski Trip', amount: 650.00, category: 'Travel', type: 'expense' },
  { id: nextId(), date: '2025-12-28', description: 'Stock Dividend', amount: 275.00, category: 'Investments', type: 'income' },
];

// aggregates transactions by month for chart data
export function getMonthlyData(transactions) {
  const months = {};

  for (const txn of transactions) {
    const key = txn.date.substring(0, 7);
    if (!months[key]) months[key] = { month: key, income: 0, expenses: 0 };

    if (txn.type === 'income') {
      months[key].income += txn.amount;
    } else {
      months[key].expenses += txn.amount;
    }
  }

  return Object.values(months)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(m => ({
      ...m,
      balance: m.income - m.expenses,
      rawMonth: m.month,
      month: formatMonthLabel(m.month),
    }));
}

// aggregates expense totals by category
export function getCategoryData(transactions) {
  const totals = {};

  for (const txn of transactions) {
    if (txn.type !== 'expense') continue;
    totals[txn.category] = (totals[txn.category] || 0) + txn.amount;
  }

  return Object.entries(totals)
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
      color: CATEGORIES[name]?.color || '#94a3b8',
    }))
    .sort((a, b) => b.value - a.value);
}

function formatMonthLabel(str) {
  const [year, month] = str.split('-');
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[parseInt(month) - 1]} ${year}`;
}

export function getSummaryStats(transactions) {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (const t of transactions) {
    if (t.type === 'income') totalIncome += t.amount;
    else totalExpenses += t.amount;
  }

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
    savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0,
    transactionCount: transactions.length,
  };
}
