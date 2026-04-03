import { CATEGORIES } from '../../data/mockData';

export default function Badge({ children, variant = 'default', category }) {
  const baseClasses = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors';

  if (category && CATEGORIES[category]) {
    const cat = CATEGORIES[category];
    return (
      <span
        className={`${baseClasses}`}
        style={{
          backgroundColor: `${cat.color}18`,
          color: cat.color,
          border: `1px solid ${cat.color}30`,
        }}
      >
        {children || category}
      </span>
    );
  }

  const variants = {
    default: 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300',
    income: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
    expense: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800',
    info: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
  };

  return (
    <span className={`${baseClasses} ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
}
