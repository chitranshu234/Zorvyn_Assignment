import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import Button from '../components/ui/Button';
import { Plus, Download } from 'lucide-react';

// prevents CSV injection by escaping values that start with =, +, -, @, etc.
function escapeCsvField(value) {
  const str = String(value);
  if (/^[=+\-@\t\r]/.test(str)) {
    return `"'${str}"`;
  }
  // wrap in quotes if it contains commas or quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default function Transactions() {
  const { isAdmin, filteredTransactions } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);

  function openAddModal() {
    setEditingTxn(null);
    setModalOpen(true);
  }

  function openEditModal(txn) {
    setEditingTxn(txn);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTxn(null);
  }

  function exportAsCSV() {
    if (filteredTransactions.length === 0) return;

    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(t => [
      escapeCsvField(t.date),
      escapeCsvField(t.description),
      escapeCsvField(t.category),
      escapeCsvField(t.type),
      t.amount.toFixed(2),
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Transactions</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            Manage and track all your financial transactions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={exportAsCSV}>
            Export CSV
          </Button>
          {isAdmin && (
            <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      <TransactionFilters />

      <TransactionList onEdit={openEditModal} />

      <AddTransactionModal
        isOpen={modalOpen}
        onClose={closeModal}
        editTransaction={editingTxn}
      />
    </div>
  );
}
