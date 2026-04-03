import InsightCards from '../components/insights/InsightCards';
import TopCategories from '../components/insights/TopCategories';
import MonthlyComparison from '../components/insights/MonthlyComparison';

export default function Insights() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Insights</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
          Understand your spending patterns and financial trends.
        </p>
      </div>

      {/* Insight cards */}
      <InsightCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCategories />
        <MonthlyComparison />
      </div>
    </div>
  );
}
