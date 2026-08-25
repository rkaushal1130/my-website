import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingScreen from './components/common/LoadingScreen';
import DemoModal from './components/common/DemoModal';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <LoadingScreen />

      <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-[#FF1F26] selection:text-white">
        
        {/* Fixed / Sticky Navbar */}
        <Navbar onOpenDemo={() => setDemoModalOpen(true)} />

        {/* Dynamic Route Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenDemo={() => setDemoModalOpen(true)} />} />
            <Route path="/services" element={<Services onOpenDemo={() => setDemoModalOpen(true)} />} />
            <Route path="/about" element={<About onOpenDemo={() => setDemoModalOpen(true)} />} />
            <Route path="/careers" element={<Careers onOpenDemo={() => setDemoModalOpen(true)} />} />
            <Route path="/contact" element={<Contact onOpenDemo={() => setDemoModalOpen(true)} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Demo Booking Modal */}
        <DemoModal
          isOpen={demoModalOpen}
          onClose={() => setDemoModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
