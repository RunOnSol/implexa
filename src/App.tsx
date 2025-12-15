import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import News from './components/News';
import Projects from './components/Projects';
import RDLab from './components/RDLab';
import Solutions from './components/Solutions';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BlogListing from './pages/BlogListing';
import BlogPost from './pages/BlogPost';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (currentPath === '/admin') {
    if (user) {
      window.history.replaceState({}, '', '/admin/dashboard');
      return <AdminDashboard />;
    }
    return <AdminLogin />;
  }

  if (currentPath === '/admin/dashboard') {
    if (!user) {
      window.history.replaceState({}, '', '/admin');
      return <AdminLogin />;
    }
    return <AdminDashboard />;
  }

  if (currentPath === '/blog') {
    return <BlogListing />;
  }

  if (currentPath.startsWith('/post/')) {
    const postId = currentPath.split('/post/')[1];
    return <BlogPost postId={postId} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Solutions />
      <RDLab />
      <Projects />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
