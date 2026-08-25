import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Sparkles, FileText, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const ApplicationModal = ({ isOpen, onClose, position }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    resume: null,
    coverLetter: '',
  });
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit.');
        return;
      }
      setFormData({ ...formData, resume: file });
      setFileName(file.name);
      setErrorMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFileName('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      resume: null,
      coverLetter: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#030303]/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0D0D10] border border-[#242424] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-left">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#FF1F26]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/50 to-transparent" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-[#141416] border border-[#242424] text-[#A7A7A7] hover:text-white hover:border-[#FF1F26] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              Application Received
            </h3>

            <p className="text-sm text-[#A7A7A7] max-w-md mx-auto leading-relaxed">
              Thank you for applying for <span className="text-white font-semibold">{position?.title || 'Open Position'}</span>. Our recruiting team will review your application and get back to you.
            </p>

            <div className="pt-4">
              <Button onClick={handleReset} variant="primary" size="md">
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FF1F26] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Job Application</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {position?.title || 'Join NeverQuit.ai'}
              </h2>
              <p className="text-xs text-[#A7A7A7]">
                {position?.department ? `${position.department} • ` : ''}Remote / Global Team
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#FF1F26]" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#CCCCCC] mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#CCCCCC] mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#CCCCCC] mb-1.5 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 90153 23903"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#CCCCCC] mb-1.5 font-medium">
                    Portfolio / GitHub / LinkedIn
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Resume Upload Box */}
              <div>
                <label className="block text-xs text-[#CCCCCC] mb-1.5 font-medium">
                  Resume / CV (PDF, DOCX up to 10MB) *
                </label>
                <label className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-[#050505] border border-dashed border-[#333] hover:border-[#FF1F26] transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {fileName ? (
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                      <FileText className="w-4 h-4" />
                      <span>{fileName}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-[#737373] group-hover:text-white transition-colors">
                      <Upload className="w-4 h-4 text-[#FF1F26]" />
                      <span>Click to upload resume</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Note / Pitch */}
              <div>
                <label className="block text-xs text-[#CCCCCC] mb-1.5 font-medium">
                  Why NeverQuit.ai? (Optional)
                </label>
                <textarea
                  name="coverLetter"
                  rows={3}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us about the hardest engineering problem you've solved..."
                  className="w-full p-3.5 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                  icon={false}
                  customIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationModal;
