import { Lightbulb, ArrowRight } from 'lucide-react';

export default function InfoCard() {
  return (
    <div
      className="dash-card card-tint-green animate-slide-up h-full flex flex-col justify-between"
      style={{ animationDelay: '200ms', animationFillMode: 'both' }}
    >
      <div>
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-3">
          <Lightbulb size={18} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-surface-900 dark:text-white leading-tight mb-1">
          How To Manage Money Well?
        </h3>
        <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
          Track spending, set budgets, and build healthy financial habits.
        </p>
      </div>

      <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-surface-800 dark:bg-surface-700 text-white text-xs font-semibold rounded-xl hover:bg-surface-700 dark:hover:bg-surface-600 transition-colors w-fit shadow-sm">
        Learn More <ArrowRight size={13} />
      </button>
    </div>
  );
}
