import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppContext } from '../../context/AppContext';

export default function Layout() {
  const { sidebarOpen } = useAppContext();

  return (
    <div className="min-h-screen bg-pastel-bg dark:bg-surface-950 transition-colors duration-300">
      <Sidebar />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}
      >
        <Header />
        <main className="p-4 lg:p-6 max-w-[1600px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
