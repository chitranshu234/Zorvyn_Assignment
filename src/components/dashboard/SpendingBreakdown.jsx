import { useAppContext } from '../../context/AppContext';
import { getMonthlyData } from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft-md border border-surface-100 dark:border-surface-700 p-3 text-xs">
      <p className="font-semibold text-surface-900 dark:text-white mb-1">{label}</p>
      <p className="text-surface-500 dark:text-surface-400">
        Spent: <span className="font-bold text-surface-900 dark:text-white">${payload[0].value?.toLocaleString()}</span>
      </p>
    </div>
  );
}

export default function SpendingBreakdown() {
  const { transactions } = useAppContext();
  const data = getMonthlyData(transactions);

  const maxVal = Math.max(...data.map(d => d.expenses));
  const total = data.reduce((s, d) => s + d.expenses, 0);

  return (
    <div className="dash-card animate-slide-up h-full" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-surface-900 dark:text-white">Spending</h3>
        <span className="text-xs font-medium text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-700 px-2.5 py-1 rounded-lg">Monthly</span>
      </div>

      <p className="text-lg font-bold text-surface-900 dark:text-white mb-3">
        ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v.split(' ')[0]}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="expenses" radius={[6, 6, 6, 6]} barSize={24}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.expenses === maxVal ? '#818cf8' : '#c7d2fe'}
                  className="transition-all duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
