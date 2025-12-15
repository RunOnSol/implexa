import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default function News() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3);
    setArticles(data || []);
    setLoading(false);
  };

  return (
    <section id="news" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#6EBF78]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">News & Insights</h2>
          <div className="w-20 h-1 bg-[#6EBF78] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Stay informed with the latest insights, research findings, and thought leadership from the Implexa team.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">No articles published yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-[#6EBF78] transition-all duration-300 overflow-hidden group hover:transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                {article.image_url ? (
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image_url})` }}
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[#6EBF78]/20 to-[#4A9D5F]/10 flex items-center justify-center">
                    <BookOpen className="text-[#6EBF78] opacity-50" size={64} />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#6EBF78]/20 text-[#6EBF78] text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">{article.read_time}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#6EBF78] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={14} />
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => {
                        window.history.pushState({}, '', `/post/${article.id}`);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="text-[#6EBF78] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => {
              window.history.pushState({}, '', '/blog');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-all duration-300 border border-gray-300"
          >
            View All Insights
          </button>
        </div>
      </div>
    </section>
  );
}
