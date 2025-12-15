import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import Header from '../components/Header';
import Footer from '../components/Footer';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogPostPageProps {
  postId: string;
}

export default function BlogPost({ postId }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .eq('published', true)
      .maybeSingle();
    setPost(data);
    setLoading(false);
  };

  const navigateBack = () => {
    window.history.pushState({}, '', '/blog');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 lg:px-8 py-20">
          <p className="text-gray-600 text-center">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={navigateBack}
            className="px-6 py-3 bg-[#6EBF78] hover:bg-[#5DAF68] text-white font-semibold rounded-lg transition-colors"
          >
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="container mx-auto px-4 lg:px-8 py-20">
        <button
          onClick={navigateBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#6EBF78] mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="px-4 py-2 bg-[#6EBF78]/20 text-[#6EBF78] text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{post.read_time}</span>
            </div>
          </div>

          {post.image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
