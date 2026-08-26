import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingScreen from './components/common/LoadingScreen';
import DemoModal from './components/common/DemoModal';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Forbidden from './pages/Forbidden';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminMessages from './pages/admin/AdminMessages';
import AdminJobs from './pages/admin/AdminJobs';
import AdminApplications from './pages/admin/AdminApplications';

function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <LoadingScreen />

        <Routes>
          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="applications" element={<AdminApplications />} />
          </Route>

          {/* Security Standalone Page */}
          <Route path="/403" element={<Forbidden />} />

          {/* Public Website Layout */}
          <Route
            path="*"
            element={
              <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-[#FF1F26] selection:text-white">
                <Navbar onOpenDemo={() => setDemoModalOpen(true)} />

                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home onOpenDemo={() => setDemoModalOpen(true)} />} />
                    <Route path="/about" element={<About onOpenDemo={() => setDemoModalOpen(true)} />} />
                    <Route path="/portfolio" element={<Portfolio onOpenDemo={() => setDemoModalOpen(true)} />} />
                    <Route path="/portfolio/:slug" element={<ProjectDetail onOpenDemo={() => setDemoModalOpen(true)} />} />
                    <Route path="/services" element={<Services onOpenDemo={() => setDemoModalOpen(true)} />} />
                    <Route path="/careers" element={<Careers onOpenDemo={() => setDemoModalOpen(true)} />} />
                    <Route path="/career" element={<Navigate to="/careers" replace />} />
                    <Route path="/contact" element={<Contact onOpenDemo={() => setDemoModalOpen(true)} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>

                <Footer />

                {/* Global Demo Booking Modal */}
                <DemoModal
                  isOpen={demoModalOpen}
                  onClose={() => setDemoModalOpen(false)}
                />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
