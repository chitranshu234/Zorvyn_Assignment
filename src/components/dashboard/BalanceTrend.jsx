import { useAppContext } from '../../context/AppContext';
import { getMonthlyData, getSummaryStats } from '../../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft-md border border-surface-100 dark:border-surface-700 p-3 text-xs">
      <p className="font-semibold text-surface-900 dark:text-white mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-surface-500 dark:text-surface-400">{entry.name}:</span>
          <span className="font-bold text-surface-900 dark:text-white">
            ${entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BalanceTrend() {
  const { transactions } = useAppContext();
  const data = getMonthlyData(transactions);
  const stats = getSummaryStats(transactions);

  return (
    <div className="dash-card animate-slide-up" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-surface-900 dark:text-white">Expenses</h3>
        <span className="text-xs font-medium text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-700 px-2.5 py-1 rounded-lg">
          {data.length > 0 ? data[data.length - 1].month : ''}
        </span>
      </div>

      <p className="text-lg font-bold text-surface-900 dark:text-white mb-4">
        ${stats.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <defs>
              <linearGradient id="expFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a5b4fc" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#a5b4fc" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="incFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6ee7b7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6ee7b7" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v.split(' ')[0]}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#expFill)"
              dot={{ fill: '#6366f1', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#34d399"
              strokeWidth={2}
              fill="url(#incFill)"
              dot={{ fill: '#34d399', strokeWidth: 0, r: 2.5 }}
              activeDot={{ r: 4, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}
              strokeDasharray="6 3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
