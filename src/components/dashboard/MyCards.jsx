import { CreditCard } from 'lucide-react';

const cards = [
  {
    bank: 'FinDash',
    type: 'VISA',
    number: '4455',
    holder: 'Jack Walson',
    gradient: 'from-blue-200 via-blue-100 to-indigo-100',
    darkGradient: 'dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-surface-800',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  {
    bank: 'FinDash',
    type: 'VISA',
    number: '1599',
    holder: 'Jack Walson',
    gradient: 'from-emerald-100 via-teal-50 to-cyan-100',
    darkGradient: 'dark:from-emerald-900/40 dark:via-teal-900/30 dark:to-surface-800',
    accent: 'text-emerald-600 dark:text-emerald-400',
  },
];

export default function MyCards() {
  return (
    <div className="dash-card animate-slide-up h-full" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
      <h3 className="text-base font-bold text-surface-900 dark:text-white mb-4">My Cards</h3>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {cards.map((card) => (
          <div
            key={card.number}
            className={`flex-shrink-0 w-52 h-32 rounded-2xl bg-gradient-to-br ${card.gradient} ${card.darkGradient} p-4 flex flex-col justify-between border border-white/50 dark:border-surface-700/50 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <CreditCard size={20} className={card.accent} />
              <span className="text-xs font-bold text-surface-600 dark:text-surface-300 tracking-wider">{card.type}</span>
            </div>
            <div>
              <p className="text-xs text-surface-500 dark:text-surface-400 font-mono tracking-widest mb-1">
                ****  ****  ****  {card.number}
              </p>
              <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">{card.holder}</p>
            </div>
          </div>
        ))}

        {/* Add card */}
        <div className="flex-shrink-0 w-16 h-32 rounded-2xl bg-surface-800 dark:bg-surface-700 flex items-center justify-center cursor-pointer hover:bg-surface-700 dark:hover:bg-surface-600 transition-colors">
          <span className="text-2xl text-white font-light">+</span>
        </div>
      </div>
    </div>
  );
}
