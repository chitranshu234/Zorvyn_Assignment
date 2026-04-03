import { useAppContext } from '../../context/AppContext';
import { getMonthlyData } from '../../data/mockData';
import Card from '../ui/Card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft-md border border-surface-100 dark:border-surface-700 p-3 text-xs">
      <p className="font-semibold text-surface-900 dark:text-white mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-surface-500 dark:text-surface-400">{entry.name}:</span>
          <span className="font-semibold text-surface-900 dark:text-white">
            ${entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function CustomLegend({ payload }) {
  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
          <span className="text-xs font-medium text-surface-600 dark:text-surface-400">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function MonthlyComparison() {
  const { transactions } = useAppContext();
  const data = getMonthlyData(transactions);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
      <div className="mb-6">
        <h3 className="text-base font-bold text-surface-900 dark:text-white">Monthly Comparison</h3>
        <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">Income vs Expenses by month</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100,116,139,0.06)' }} />
            <Legend content={<CustomLegend />} />
            <Bar dataKey="income" name="Income" fill="#6ee7b7" radius={[4, 4, 0, 0]} barSize={28} />
            <Bar dataKey="expenses" name="Expenses" fill="#a5b4fc" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
