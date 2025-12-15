import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LogOut,
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  Menu,
  X
} from 'lucide-react';
import BlogManager from '../components/admin/BlogManager';
import ExecutivesManager from '../components/admin/ExecutivesManager';
import MessagesView from '../components/admin/MessagesView';
import DashboardOverview from '../components/admin/DashboardOverview';

type View = 'overview' | 'blog' | 'executives' | 'messages';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<View>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut, user } = useAuth();

  const menuItems = [
    { id: 'overview' as View, label: 'Overview', icon: LayoutDashboard },
    { id: 'blog' as View, label: 'Blog Posts', icon: FileText },
    { id: 'executives' as View, label: 'Executives', icon: Users },
    { id: 'messages' as View, label: 'Messages', icon: Mail },
  ];

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/admin';
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'blog':
        return <BlogManager />;
      case 'executives':
        return <ExecutivesManager />;
      case 'messages':
        return <MessagesView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <img
                  src="http://implexa.org/images/logo.png"
                  className="w-8 h-8 rounded-full"
                  alt="Implexa"
                />
                <span className="text-white font-bold text-lg">Admin</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-[#6EBF78] text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="px-4 py-4 border-t border-gray-700">
              <div className="mb-4 px-4 py-3 bg-gray-800 rounded-lg">
                <p className="text-gray-400 text-xs mb-1">Signed in as</p>
                <p className="text-white text-sm font-medium truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {menuItems.find((item) => item.id === currentView)?.label}
            </h1>
            <button
              onClick={() => window.location.href = '/'}
              className="text-gray-600 hover:text-[#6EBF78] text-sm font-medium transition-colors"
            >
              View Website
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            {renderView()}
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}
    </div>
  );
}
