import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShoppingCart, CreditCard, Utensils } from 'lucide-react';

const categoryIcons = {
  'Salary': TrendingUp,
  'Freelance': TrendingUp,
  'Investments': TrendingUp,
  'Shopping': ShoppingCart,
  'Food & Dining': Utensils,
  'Groceries': ShoppingCart,
};

export default function RecentTransactions() {
  const { transactions } = useAppContext();
  const navigate = useNavigate();

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="dash-card animate-slide-up h-full flex flex-col" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-surface-900 dark:text-white">Transactions</h3>
        <button
          onClick={() => navigate('/transactions')}
          className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
        >
          See All
        </button>
      </div>

      <div className="flex-1 space-y-1">
        {recent.map((txn) => {
          const IconComp = categoryIcons[txn.category] || (txn.type === 'income' ? TrendingUp : CreditCard);
          return (
            <div
              key={txn.id}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                txn.type === 'income'
                  ? 'bg-emerald-50 dark:bg-emerald-900/30'
                  : 'bg-surface-100 dark:bg-surface-800'
              }`}>
                <IconComp size={15} className={
                  txn.type === 'income'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-surface-500 dark:text-surface-400'
                } />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                  {txn.description}
                </p>
                <p className="text-[11px] text-surface-400 dark:text-surface-500 mt-0.5">{formatDate(txn.date)}</p>
              </div>

              {/* Amount */}
              <span className={`text-sm font-bold whitespace-nowrap ${
                txn.type === 'income'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-surface-900 dark:text-white'
              }`}>
                {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
