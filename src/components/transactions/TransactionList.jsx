import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { Edit2, Trash2, ArrowRightLeft, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TransactionList({ onEdit }) {
  const { filteredTransactions, isAdmin, dispatch } = useAppContext();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function handleDelete(id) {
    if (confirmDeleteId === id) {
      // second click — actually delete
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      setConfirmDeleteId(null);
    } else {
      // first click — ask for confirmation
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="dash-card">
        <EmptyState
          icon={ArrowRightLeft}
          title="No transactions found"
          description="Try adjusting your filters or add a new transaction."
        />
      </div>
    );
  }

  return (
    <div className="dash-card overflow-hidden animate-fade-in p-0">
      {/* table header — only visible on desktop */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-surface-200 dark:border-surface-700 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
        <div className="col-span-1">Date</div>
        <div className="col-span-3">Description</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2 text-right">Amount</div>
        {isAdmin && <div className="col-span-2 text-right">Actions</div>}
      </div>

      <div className="divide-y divide-surface-100 dark:divide-surface-800">
        {filteredTransactions.map((txn) => (
          <div
            key={txn.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors group items-center"
          >
            <div className="col-span-1 text-sm text-surface-600 dark:text-surface-400">
              <span className="md:hidden text-xs font-semibold text-surface-400 mr-2">Date:</span>
              {formatDate(txn.date)}
            </div>

            <div className="col-span-3">
              <p className="text-sm font-semibold text-surface-900 dark:text-white">{txn.description}</p>
            </div>

            <div className="col-span-2">
              <Badge category={txn.category} />
            </div>

            <div className="col-span-2">
              <Badge variant={txn.type}>
                <span className="inline-flex items-center gap-1">
                  {txn.type === 'income'
                    ? <><ArrowUpRight size={12} /> Income</>
                    : <><ArrowDownRight size={12} /> Expense</>
                  }
                </span>
              </Badge>
            </div>

            <div className={`col-span-2 text-right text-sm font-bold ${
              txn.type === 'income'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}>
              {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>

            {isAdmin && (
              <div className="col-span-2 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(txn)}
                  className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(txn.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    confirmDeleteId === txn.id
                      ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
                      : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-rose-600 dark:hover:text-rose-400'
                  }`}
                  title={confirmDeleteId === txn.id ? 'Click again to confirm' : 'Delete'}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-900/50">
        <p className="text-xs text-surface-500 dark:text-surface-400">
          Showing <span className="font-semibold text-surface-700 dark:text-surface-300">{filteredTransactions.length}</span> transactions
        </p>
      </div>
    </div>
  );
}
