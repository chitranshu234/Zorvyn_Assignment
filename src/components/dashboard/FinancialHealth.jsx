import { useAppContext } from '../../context/AppContext';
import { getSummaryStats } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

export default function FinancialHealth() {
  const { transactions } = useAppContext();
  const stats = getSummaryStats(transactions);

  // Calculate a financial health score (0-2000 range like credit score)
  const savingsRate = stats.savingsRate;
  const score = Math.min(2000, Math.max(300, Math.round(300 + (savingsRate / 100) * 1700)));

  // Score label
  const getLabel = (s) => {
    if (s >= 1500) return { text: 'Excellent', color: 'text-emerald-500' };
    if (s >= 1200) return { text: 'Very Good', color: 'text-green-500' };
    if (s >= 900) return { text: 'Good', color: 'text-blue-500' };
    if (s >= 600) return { text: 'Fair', color: 'text-amber-500' };
    return { text: 'Needs Work', color: 'text-rose-500' };
  };

  const label = getLabel(score);

  // Gauge angle calculation (score 300-2000 maps to -120 to 120 degrees)
  const normalized = (score - 300) / (2000 - 300); // 0 to 1
  const angle = -120 + normalized * 240; // -120 to 120

  return (
    <div className="dash-card animate-slide-up h-full flex flex-col" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-surface-900 dark:text-white">Financial Health</h3>
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 cursor-pointer hover:text-brand-700 transition-colors">See More</span>
      </div>

      {/* Gauge */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-48 h-28 mb-2">
          <svg viewBox="0 0 200 110" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="16"
              strokeLinecap="round"
              className="dark:stroke-surface-700"
            />
            {/* Colored segments */}
            <path
              d="M 20 100 A 80 80 0 0 1 60 35"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 60 35 A 80 80 0 0 1 100 20"
              fill="none"
              stroke="#fb923c"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 100 20 A 80 80 0 0 1 140 35"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 140 35 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#34d399"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Needle */}
            <line
              x1="100"
              y1="100"
              x2={100 + 55 * Math.cos((angle - 90) * Math.PI / 180)}
              y2={100 + 55 * Math.sin((angle - 90) * Math.PI / 180)}
              stroke="#1e293b"
              strokeWidth="3"
              strokeLinecap="round"
              className="dark:stroke-white transition-all duration-1000"
            />
            <circle cx="100" cy="100" r="5" fill="#1e293b" className="dark:fill-white" />
          </svg>
        </div>

        <p className="text-4xl font-extrabold text-surface-900 dark:text-white">{score}</p>
        <p className={`text-sm font-semibold ${label.color} mt-1`}>{label.text}</p>
      </div>

      {/* CTA */}
      <button className="mt-3 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-semibold rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors border border-brand-100 dark:border-brand-800">
        Explore Benefits <ArrowRight size={13} />
      </button>
    </div>
  );
}
