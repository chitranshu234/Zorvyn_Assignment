import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { getSummaryStats } from '../../data/mockData';
import { Send, ArrowDownLeft } from 'lucide-react';

function AnimatedNumber({ value, prefix = '$', decimals = 2 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const parts = formatted.split('.');

  return (
    <span>
      {prefix}{parts[0]}
      {decimals > 0 && <span className="text-surface-400 dark:text-surface-500 text-2xl font-semibold">.{parts[1]}</span>}
    </span>
  );
}

export default function SummaryCards() {
  const { transactions } = useAppContext();
  const stats = getSummaryStats(transactions);

  return (
    <div className="dash-card card-tint-blue animate-slide-up h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-2">Total Balance</p>
        <p className="text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
          <AnimatedNumber value={stats.totalBalance} />
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mt-5">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600 text-sm font-semibold text-surface-700 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700 transition-all shadow-sm">
          <Send size={15} className="text-brand-500" />
          Send
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600 text-sm font-semibold text-surface-700 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700 transition-all shadow-sm">
          <ArrowDownLeft size={15} className="text-emerald-500" />
          Receive
        </button>
      </div>
    </div>
  );
}
