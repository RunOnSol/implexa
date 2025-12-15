import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import Header from '../components/Header';
import Footer from '../components/Footer';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const navigateToPost = (postId: string) => {
    window.history.pushState({}, '', `/post/${postId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              News & Insights
            </h1>
            <div className="w-20 h-1 bg-[#6EBF78] mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Stay informed with the latest insights, research findings, and thought leadership from the Implexa team.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#6EBF78] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-6">No articles published yet</p>
              <button
                onClick={navigateHome}
                className="px-6 py-3 bg-[#6EBF78] hover:bg-[#5DAF68] text-white font-semibold rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-[#6EBF78] transition-all duration-300 overflow-hidden group hover:transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer"
                  onClick={() => navigateToPost(post.id)}
                >
                  {post.image_url ? (
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image_url})` }}
                    />
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#6EBF78]/20 to-[#4A9D5F]/10 flex items-center justify-center">
                      <BookOpen className="text-[#6EBF78] opacity-50" size={64} />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-[#6EBF78]/20 text-[#6EBF78] text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.read_time}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#6EBF78] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={14} />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <span className="text-[#6EBF78] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
