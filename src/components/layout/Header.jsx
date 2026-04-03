import { useAppContext } from '../../context/AppContext';
import { Menu, Sun, Moon, Shield, Eye, Bell, Search } from 'lucide-react';

export default function Header() {
  const { darkMode, role, dispatch } = useAppContext();

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="lg:hidden p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2 bg-surface-100 dark:bg-surface-800 rounded-xl px-3 py-2 w-64 lg:w-80">
            <Search size={16} className="text-surface-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent text-sm text-surface-700 dark:text-surface-300 placeholder-surface-400 outline-none w-full"
              aria-label="Search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* role switcher */}
          <div className="relative">
            <select
              value={role}
              onChange={(e) => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
              className="appearance-none bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-surface-700 dark:text-surface-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              aria-label="Switch role"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              {role === 'admin'
                ? <Shield size={14} className="text-brand-500" />
                : <Eye size={14} className="text-surface-400" />
              }
            </div>
          </div>

          <button
            className="relative p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-surface-900" />
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          <div
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer shadow-lg shadow-brand-500/20"
            role="img"
            aria-label="User avatar"
          >
            CP
          </div>
        </div>
      </div>
    </header>
  );
}
