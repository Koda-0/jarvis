import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/layout/DashboardSidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-dark-900 flex">
      <DashboardSidebar />
      <div className="flex-1 min-w-0 lg:ml-64 p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}
