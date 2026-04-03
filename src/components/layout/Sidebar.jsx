import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { LayoutDashboard, ArrowRightLeft, Lightbulb, ChevronLeft, Landmark } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowRightLeft },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const { sidebarOpen, dispatch } = useAppContext();

  function closeMobileMenu() {
    if (window.innerWidth < 1024) dispatch({ type: 'TOGGLE_SIDEBAR' });
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full
          bg-white/90 dark:bg-surface-900/95 backdrop-blur-xl
          border-r border-surface-200 dark:border-surface-800
          transition-all duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="h-16 flex items-center gap-3 px-5 border-b border-surface-200 dark:border-surface-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/30">
            <Landmark size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-lg font-bold text-surface-900 dark:text-white animate-fade-in">
              Mon<span className="text-brand-500">eta</span>
            </span>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-brand-50 dark:bg-brand-600/15 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'
                }
                ${!sidebarOpen ? 'justify-center' : ''}`
              }
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="animate-fade-in">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex p-3 border-t border-surface-200 dark:border-surface-800">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium
              text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-700 dark:hover:text-surface-300
              transition-all duration-200 ${!sidebarOpen ? 'justify-center' : ''}`}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronLeft size={18} className={`transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
