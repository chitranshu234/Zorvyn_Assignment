import { useAppContext } from '../../context/AppContext';
import { getCategoryData } from '../../data/mockData';
import Card from '../ui/Card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.[0]) return null;
  const { name, value, payload: data } = payload[0];
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft-md border border-surface-100 dark:border-surface-700 p-3 text-xs">
      <p className="font-semibold text-surface-900 dark:text-white mb-1">{data.name}</p>
      <p className="text-surface-500 dark:text-surface-400">
        Total: <span className="font-semibold text-surface-900 dark:text-white">${value.toLocaleString()}</span>
      </p>
    </div>
  );
}

export default function TopCategories() {
  const { transactions } = useAppContext();
  const data = getCategoryData(transactions).slice(0, 8);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
      <div className="mb-6">
        <h3 className="text-base font-bold text-surface-900 dark:text-white">Top Spending Categories</h3>
        <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">Where your money goes</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100,116,139,0.06)' }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
