import { Component } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || 'An unexpected rendering error occurred.',
    };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-obsidian px-6 text-center text-canvas">
          <p className="font-mono text-xs uppercase tracking-widest text-lime">
            Render Diagnostic
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold">
            Unable to display this view
          </h1>
          <p className="mt-2 max-w-md font-mono text-xs text-muted-light">
            {this.state.message}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-lime px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-obsidian"
          >
            Reload Preview
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-canvas text-obsidian">
          <Loader />
          <CustomCursor />
          <ScrollToTop />
          <Navbar />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>

          <Footer />
        </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}
