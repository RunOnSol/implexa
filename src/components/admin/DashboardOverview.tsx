import { useEffect, useState } from 'react';
import { FileText, Users, Mail, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalExecutives: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [posts, executives, messages] = await Promise.all([
      supabase.from('blog_posts').select('id, published', { count: 'exact' }),
      supabase.from('executives').select('id', { count: 'exact' }),
      supabase.from('contact_messages').select('id', { count: 'exact' }).eq('read', false),
    ]);

    setStats({
      totalPosts: posts.count || 0,
      publishedPosts: posts.data?.filter((p) => p.published).length || 0,
      totalExecutives: executives.count || 0,
      unreadMessages: messages.count || 0,
    });
  };

  const statCards = [
    {
      title: 'Total Blog Posts',
      value: stats.totalPosts,
      subtitle: `${stats.publishedPosts} published`,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Executives',
      value: stats.totalExecutives,
      subtitle: 'Team members',
      icon: Users,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      subtitle: 'Pending review',
      icon: Mail,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Activity',
      value: '100%',
      subtitle: 'System status',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
                >
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-gray-500 text-xs">{card.subtitle}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#6EBF78] hover:bg-gray-50 transition-all text-left">
            <FileText className="text-[#6EBF78] mb-2" size={24} />
            <h3 className="font-semibold text-gray-900 mb-1">Create Blog Post</h3>
            <p className="text-sm text-gray-600">Write a new article</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#6EBF78] hover:bg-gray-50 transition-all text-left">
            <Users className="text-[#6EBF78] mb-2" size={24} />
            <h3 className="font-semibold text-gray-900 mb-1">Add Executive</h3>
            <p className="text-sm text-gray-600">Add a team member</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#6EBF78] hover:bg-gray-50 transition-all text-left">
            <Mail className="text-[#6EBF78] mb-2" size={24} />
            <h3 className="font-semibold text-gray-900 mb-1">View Messages</h3>
            <p className="text-sm text-gray-600">Check inbox</p>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to Admin Dashboard</h2>
        <p className="text-gray-600 mb-4">
          Manage your website content, team members, and communication with ease. Use the sidebar
          to navigate between different sections.
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-[#6EBF78] font-bold">•</span>
            <span>Create and publish blog posts to share insights and updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#6EBF78] font-bold">•</span>
            <span>Add and manage executive team members with photos and bios</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#6EBF78] font-bold">•</span>
            <span>Review and respond to contact form submissions</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
