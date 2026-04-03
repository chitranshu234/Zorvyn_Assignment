import { useAppContext } from '../../context/AppContext';
import { getCategoryData, getMonthlyData, getSummaryStats } from '../../data/mockData';
import Card from '../ui/Card';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Calendar,
  DollarSign,
} from 'lucide-react';

export default function InsightCards() {
  const { transactions } = useAppContext();
  const categoryData = getCategoryData(transactions);
  const monthlyData = getMonthlyData(transactions);
  const stats = getSummaryStats(transactions);

  // Calculate insights
  const highestCategory = categoryData[0] || { name: 'N/A', value: 0 };
  const lowestCategory = categoryData[categoryData.length - 1] || { name: 'N/A', value: 0 };

  // Month over month comparison
  const currentMonth = monthlyData[monthlyData.length - 1] || { expenses: 0, income: 0 };
  const previousMonth = monthlyData[monthlyData.length - 2] || { expenses: 0, income: 0 };
  const expenseChange = previousMonth.expenses > 0
    ? ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1)
    : 0;

  // Average daily spending
  const totalDays = transactions.length > 0 ? 
    Math.max(1, Math.ceil((new Date(transactions[0].date) - new Date(transactions[transactions.length - 1].date)) / (1000 * 60 * 60 * 24))) : 1;
  const avgDaily = (stats.totalExpenses / Math.max(totalDays, 1));

  // Income to expense ratio
  const ratio = stats.totalExpenses > 0 ? (stats.totalIncome / stats.totalExpenses).toFixed(2) : 'N/A';

  const insights = [
    {
      title: 'Highest Spending',
      value: highestCategory.name,
      detail: `$${highestCategory.value.toLocaleString()} total`,
      icon: TrendingUp,
      color: 'text-rose-500',
      bg: 'bg-rose-100 dark:bg-rose-900/40',
    },
    {
      title: 'Lowest Spending',
      value: lowestCategory.name,
      detail: `$${lowestCategory.value.toLocaleString()} total`,
      icon: TrendingDown,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    },
    {
      title: 'Monthly Change',
      value: `${expenseChange > 0 ? '+' : ''}${expenseChange}%`,
      detail: 'Expense change vs last month',
      icon: Calendar,
      color: expenseChange > 0 ? 'text-rose-500' : 'text-emerald-500',
      bg: expenseChange > 0 ? 'bg-rose-100 dark:bg-rose-900/40' : 'bg-emerald-100 dark:bg-emerald-900/40',
    },
    {
      title: 'Savings Rate',
      value: `${stats.savingsRate.toFixed(1)}%`,
      detail: 'Of income saved',
      icon: Target,
      color: 'text-purple-500',
      bg: 'bg-purple-100 dark:bg-purple-900/40',
    },
    {
      title: 'Avg. Daily Spend',
      value: `$${avgDaily.toFixed(0)}`,
      detail: 'Based on all transactions',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-900/40',
    },
    {
      title: 'Income/Expense Ratio',
      value: `${ratio}x`,
      detail: ratio >= 1 ? 'Healthy ratio' : 'Below optimal',
      icon: DollarSign,
      color: 'text-brand-500',
      bg: 'bg-brand-100 dark:bg-brand-900/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {insights.map((insight, i) => (
        <Card
          key={insight.title}
          hover
          className="animate-slide-up"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
        >
          <div className="flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl ${insight.bg} flex items-center justify-center flex-shrink-0`}>
              <insight.icon size={20} className={insight.color} />
            </div>
            <div>
              <p className="text-xs font-medium text-surface-500 dark:text-surface-400">{insight.title}</p>
              <p className="text-lg font-bold text-surface-900 dark:text-white mt-0.5">{insight.value}</p>
              <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{insight.detail}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
