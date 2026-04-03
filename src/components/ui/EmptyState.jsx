import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No data found', description = 'Try adjusting your filters or add new data.', icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
        <Icon size={28} className="text-surface-400" />
      </div>
      <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-1">{title}</h3>
      <p className="text-sm text-surface-500 text-center max-w-sm">{description}</p>
    </div>
  );
}
