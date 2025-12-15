import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];

export default function MessagesView() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  const toggleRead = async (message: ContactMessage) => {
    await supabase
      .from('contact_messages')
      .update({ read: !message.read })
      .eq('id', message.id);
    loadMessages();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      await supabase.from('contact_messages').delete().eq('id', id);
      loadMessages();
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[#6EBF78] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-[#6EBF78] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Unread ({messages.filter((m) => !m.read).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'read'
                ? 'bg-[#6EBF78] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Read ({messages.filter((m) => m.read).length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading messages...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Mail className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No messages found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-xl border-2 p-6 transition-all ${
                message.read
                  ? 'border-gray-200 hover:shadow-md'
                  : 'border-[#6EBF78]/50 bg-[#6EBF78]/5 hover:shadow-lg'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      message.read ? 'bg-gray-100' : 'bg-[#6EBF78]/20'
                    }`}
                  >
                    {message.read ? (
                      <MailOpen className="text-gray-600" size={24} />
                    ) : (
                      <Mail className="text-[#6EBF78]" size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{message.name}</h3>
                    <a
                      href={`mailto:${message.email}`}
                      className="text-[#6EBF78] hover:underline text-sm"
                    >
                      {message.email}
                    </a>
                  </div>
                </div>
                {!message.read && (
                  <span className="px-3 py-1 bg-[#6EBF78] text-white text-xs font-semibold rounded-full">
                    New
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                {message.message}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>{new Date(message.created_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRead(message)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {message.read ? (
                      <>
                        <Mail size={16} />
                        Mark Unread
                      </>
                    ) : (
                      <>
                        <MailOpen size={16} />
                        Mark Read
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
