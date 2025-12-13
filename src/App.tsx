import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import News from './components/News';
import Projects from './components/Projects';
import RDLab from './components/RDLab';
import Solutions from './components/Solutions';

function App() {
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

export default App;
