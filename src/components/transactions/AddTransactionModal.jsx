import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Save, X } from 'lucide-react';

const MAX_DESCRIPTION_LENGTH = 100;
const MAX_AMOUNT = 999999.99;

const blankForm = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: '',
  category: 'Food & Dining',
  type: 'expense',
};

// strip anything that could cause issues in CSV/JSON exports
function sanitize(str) {
  return str.replace(/[<>{}]/g, '').trim();
}

export default function AddTransactionModal({ isOpen, onClose, editTransaction }) {
  const { dispatch } = useAppContext();
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTransaction) {
      setForm({
        date: editTransaction.date,
        description: editTransaction.description,
        amount: String(editTransaction.amount),
        category: editTransaction.category,
        type: editTransaction.type,
      });
    } else {
      setForm(blankForm);
    }
    setErrors({});
  }, [editTransaction, isOpen]);

  function validate() {
    const newErrors = {};
    const desc = sanitize(form.description);

    if (!desc) {
      newErrors.description = 'Please enter a description';
    } else if (desc.length > MAX_DESCRIPTION_LENGTH) {
      newErrors.description = `Max ${MAX_DESCRIPTION_LENGTH} characters`;
    }

    const amount = parseFloat(form.amount);
    if (!form.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Enter a valid amount';
    } else if (amount > MAX_AMOUNT) {
      newErrors.amount = `Max amount is $${MAX_AMOUNT.toLocaleString()}`;
    }

    if (!form.date) {
      newErrors.date = 'Pick a date';
    }

    // make sure category is legit
    if (!CATEGORIES[form.category]) {
      newErrors.category = 'Invalid category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const transaction = {
      id: editTransaction?.id || `txn_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      date: form.date,
      description: sanitize(form.description),
      amount: parseFloat(parseFloat(form.amount).toFixed(2)),
      category: form.category,
      type: form.type,
    };

    dispatch({
      type: editTransaction ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION',
      payload: transaction,
    });

    onClose();
    setForm(blankForm);
  }

  const fieldClass = (field) =>
    `w-full bg-surface-50 dark:bg-surface-800 border rounded-xl px-3 py-2.5 text-sm text-surface-900 dark:text-white placeholder-surface-400 outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
      errors[field] ? 'border-rose-500' : 'border-surface-200 dark:border-surface-700'
    }`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editTransaction ? 'Edit Transaction' : 'Add Transaction'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">
            Description
          </label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="e.g., Grocery Shopping"
            maxLength={MAX_DESCRIPTION_LENGTH}
            autoComplete="off"
            className={fieldClass('description')}
          />
          {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={MAX_AMOUNT}
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              className={fieldClass('amount')}
            />
            {errors.amount && <p className="text-xs text-rose-500 mt-1">{errors.amount}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              className={fieldClass('date')}
            />
            {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={fieldClass('category')}
            >
              {Object.keys(CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">
              Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, type: 'expense' })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  form.type === 'expense'
                    ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, type: 'income' })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  form.type === 'income'
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                Income
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-200 dark:border-surface-700">
          <Button variant="ghost" onClick={onClose} icon={X}>Cancel</Button>
          <Button variant="primary" type="submit" icon={Save}>
            {editTransaction ? 'Update' : 'Add'} Transaction
          </Button>
        </div>
      </form>
    </Modal>
  );
}
