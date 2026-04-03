import SummaryCards from '../components/dashboard/SummaryCards';
import MyCards from '../components/dashboard/MyCards';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import InfoCard from '../components/dashboard/InfoCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BalanceTrend from '../components/dashboard/BalanceTrend';
import FinancialHealth from '../components/dashboard/FinancialHealth';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const { role } = useAppContext();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400 bg-white dark:bg-surface-800 rounded-xl px-3 py-2 shadow-soft border border-surface-100 dark:border-surface-700">
          <span className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-brand-500' : 'bg-amber-500'}`} />
          Logged in as <span className="font-semibold text-surface-700 dark:text-surface-300 capitalize">{role}</span>
        </div>
      </div>

      {/* top row — 3 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 flex flex-col gap-5">
          <SummaryCards />
          <MyCards />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-5">
          <SpendingBreakdown />
          <InfoCard />
        </div>

        <div className="lg:col-span-4">
          <RecentTransactions />
        </div>
      </div>

      {/* bottom row — chart + health gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <BalanceTrend />
        </div>
        <div className="lg:col-span-4">
          <FinancialHealth />
        </div>
      </div>
    </div>
  );
}
