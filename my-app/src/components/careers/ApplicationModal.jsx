import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import ButtonLoader from '../common/ButtonLoader';
import { careerService } from '../../services';

const ApplicationModal = ({ isOpen, onClose, position, job }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    coverLetter: '',
  });
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState([]);

  if (!isOpen) return null;

  const currentJob = job || position;
  const jobTitle = currentJob?.title || 'Open Application';
  const jobId = currentJob?.id;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
    if (fieldErrors.length) setFieldErrors([]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit.');
        return;
      }
      setFileName(file.name);
      setErrorMessage('');
    }
  };

  const validateClientSide = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    const letter = formData.coverLetter.trim();
    if (!letter || letter.length < 10) {
      setErrorMessage('Please provide a brief cover note / intro (minimum 10 characters).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage('');
    setFieldErrors([]);

    // 1. Client-side validation
    if (!validateClientSide()) {
      return;
    }

    // 2. Disable button & Show "Submitting..."
    setIsSubmitting(true);

    try {
      // 3. Dispatch to careerService.submitApplication
      await careerService.submitApplication({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        role: jobTitle,
        experience: 'General Applicant',
        portfolio: formData.portfolio.trim() || undefined,
        resume: fileName || undefined,
        introduction: formData.coverLetter.trim(),
      });

      // 4. On success: Show success & clear form
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        coverLetter: '',
      });
      setFileName('');
    } catch (err) {
      console.error('Application submission error:', err);
      // Friendly error handling
      const friendlyMessage =
        err.status === 400 && err.message
          ? err.message
          : 'Unable to submit your application right now. Please try again.';

      setErrorMessage(friendlyMessage);
      if (err.errors && Array.isArray(err.errors)) {
        setFieldErrors(err.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFileName('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      coverLetter: '',
    });
    setErrorMessage('');
    setFieldErrors([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#030303]/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl bg-[#0D0D10] border border-[#242424] p-5 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-left max-h-[92vh] flex flex-col my-auto">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#FF1F26]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-[#141418] border border-[#262626] text-[#A7A7A7] hover:text-white hover:border-[#FF1F26]/50 transition-colors cursor-pointer z-10 shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="py-8 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              Application submitted successfully.
            </h3>

            <p className="text-sm text-[#A7A7A7] max-w-md mx-auto leading-relaxed">
              Thank you for applying to NeverquiT AI. Our talent and engineering team will review your application for{' '}
              <span className="text-white font-semibold">{jobTitle}</span> and contact you shortly.
            </p>

            <div className="pt-4">
              <Button onClick={handleReset} variant="outline" size="md">
                Close
              </Button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="overflow-y-auto pr-0.5">
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF1F26]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Job Application</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Apply for {jobTitle}
              </h3>
            </div>

            <ErrorMessage
              message={errorMessage}
              errors={fieldErrors}
              variant="banner"
              className="mb-4"
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                  Full Name <span className="text-[#FF1F26]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dr. Alan Turing"
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    Email Address <span className="text-[#FF1F26]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alan@turing.org"
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                  Portfolio / GitHub / LinkedIn URL
                </label>
                <input
                  type="url"
                  name="portfolio"
                  disabled={isSubmitting}
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                  Cover Note / Introduction <span className="text-[#FF1F26]">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  rows={3}
                  required
                  disabled={isSubmitting}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us what excites you about building autonomous AI at NeverquiT AI..."
                  className="w-full p-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 resize-none disabled:opacity-60"
                />
              </div>

              {/* Resume File Attachment */}
              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                  Resume / CV (PDF or DOCX)
                </label>
                <label className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#050505] border border-dashed border-[#2A2A2A] hover:border-[#FF1F26]/60 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5 text-xs text-[#888888]">
                    <Upload className="w-4 h-4 text-[#FF1F26]" />
                    <span>{fileName || 'Attach resume document (max 10MB)'}</span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    disabled={isSubmitting}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-[11px] px-2.5 py-1 rounded bg-[#18181C] text-[#AAAAAA] font-mono">
                    Browse
                  </span>
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="ghost"
                  size="md"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-sm font-semibold shadow-[0_0_20px_rgba(255,31,38,0.35)] hover:shadow-[0_0_30px_rgba(255,31,38,0.55)] transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
