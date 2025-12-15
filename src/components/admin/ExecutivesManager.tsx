import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Executive = Database['public']['Tables']['executives']['Row'];

export default function ExecutivesManager() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExecutive, setEditingExecutive] = useState<Executive | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    image_url: '',
    order_index: 0,
  });

  useEffect(() => {
    loadExecutives();
  }, []);

  const loadExecutives = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('executives')
      .select('*')
      .order('order_index', { ascending: true });
    setExecutives(data || []);
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `executives/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('implexa-images')
      .upload(filePath, file);

    if (!uploadError) {
      const { data } = supabase.storage.from('implexa-images').getPublicUrl(filePath);
      setFormData({ ...formData, image_url: data.publicUrl });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingExecutive) {
      await supabase
        .from('executives')
        .update(formData)
        .eq('id', editingExecutive.id);
    } else {
      await supabase.from('executives').insert([formData]);
    }

    resetForm();
    loadExecutives();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this executive?')) {
      await supabase.from('executives').delete().eq('id', id);
      loadExecutives();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      bio: '',
      image_url: '',
      order_index: executives.length,
    });
    setEditingExecutive(null);
    setShowForm(false);
  };

  const startEdit = (executive: Executive) => {
    setEditingExecutive(executive);
    setFormData({
      name: executive.name,
      title: executive.title,
      bio: executive.bio,
      image_url: executive.image_url || '',
      order_index: executive.order_index,
    });
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {editingExecutive ? 'Edit Executive' : 'Add New Executive'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-900 font-medium mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6EBF78]"
                placeholder="Dr. John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-900 font-medium mb-2">Title/Position</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6EBF78]"
                placeholder="CEO & Founder"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Biography</label>
            <textarea
              required
              rows={6}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6EBF78]"
              placeholder="Brief biography and background..."
            />
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Profile Picture</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1"
              />
              {uploading && <span className="text-gray-600">Uploading...</span>}
            </div>
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Display Order</label>
            <input
              type="number"
              required
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6EBF78]"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-[#6EBF78] hover:bg-[#5DAF68] text-white font-semibold rounded-lg transition-colors"
            >
              {editingExecutive ? 'Update Executive' : 'Add Executive'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Executives</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#6EBF78] hover:bg-[#5DAF68] text-white font-semibold rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Executive
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading executives...</p>
        </div>
      ) : executives.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <User className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 mb-4">No executives added yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#6EBF78] hover:bg-[#5DAF68] text-white font-semibold rounded-lg transition-colors"
          >
            Add First Executive
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {executives.map((executive) => (
            <div
              key={executive.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                {executive.image_url ? (
                  <img
                    src={executive.image_url}
                    alt={executive.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-[#6EBF78] to-[#4A9D5F] rounded-full flex items-center justify-center">
                    <User className="text-white" size={32} />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{executive.name}</h3>
                  <p className="text-[#6EBF78] font-semibold mb-2">{executive.title}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{executive.bio}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Order: {executive.order_index}</span>
                <div className="flex-1"></div>
                <button
                  onClick={() => startEdit(executive)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(executive.id)}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
