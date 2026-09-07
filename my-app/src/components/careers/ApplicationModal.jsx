import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, CheckCircle2, ArrowRight, Loader2, Briefcase, User, Mail, Phone, Globe, FileText } from 'lucide-react';
import { careerService } from '../../services';
import brandLogo from '../../assets/images/logo.png';

const itRoles = [
  'Full Stack Developer (MERN / TypeScript)',
  'Front-End Developer (React / Next.js)',
  'Back-End Developer (Node.js / Express / Python)',
  'AI / Machine Learning Engineer',
  'Mobile App Developer (React Native / Flutter)',
  'DevOps & Cloud Engineer (AWS / Docker / Kubernetes)',
  'UI/UX Designer',
  'Product Designer',
  'QA Automation Engineer',
  'Software QA Tester',
  'Data Engineer',
  'Cybersecurity & Systems Specialist',
  'Digital Marketing Executive',
  'Business Development Executive',
  'General Application / Open Role',
];

const experienceOptions = [
  'Fresher / Entry Level (< 1 Year)',
  '1 - 3 Years',
  '3 - 5 Years',
  '5+ Years (Senior / Lead)',
];

const ApplicationModal = ({ isOpen, onClose, job }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleTitle: itRoles[0],
    experience: experienceOptions[1],
    portfolio: '',
    coverLetter: '',
  });

  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update roleTitle when a specific job is passed
  useEffect(() => {
    if (job?.title) {
      const match = itRoles.find((r) => r.toLowerCase().includes(job.title.toLowerCase()));
      setFormData((prev) => ({
        ...prev,
        roleTitle: match || job.title,
      }));
    }
  }, [job]);

  // Lock body scroll when modal is open and add Escape key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleReset();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit.');
        return;
      }
      setFileName(file.name);
      setErrorMessage('');
    }
  };

  const validate = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!formData.coverLetter.trim() || formData.coverLetter.trim().length < 10) {
      setErrorMessage('Please provide a brief intro or message (minimum 10 characters).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await careerService.submitApplication({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        role: formData.roleTitle,
        jobTitle: formData.roleTitle,
        experience: formData.experience,
        portfolio: formData.portfolio.trim() || undefined,
        resume: fileName || undefined,
        introduction: formData.coverLetter.trim(),
        coverLetter: formData.coverLetter.trim(),
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Application submission error:', err);
      // If error from backend validation, display error; else show friendly message
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Unable to submit application. Please try again.';
      setErrorMessage(msg);
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
      roleTitle: itRoles[0],
      experience: experienceOptions[1],
      portfolio: '',
      coverLetter: '',
    });
    setErrorMessage('');
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleReset}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#0E0E12] border border-[#26262B] p-6 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(255,31,38,0.1)] overflow-hidden text-left max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF1F26]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-[#17171C] border border-[#2A2A32] text-[#A7A7A7] hover:text-white hover:border-[#FF1F26] transition-all cursor-pointer z-20 shadow-md select-none"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="py-10 text-center space-y-4 overflow-y-auto">
            <img
              src={brandLogo}
              alt="Avaura"
              className="h-10 w-auto max-w-[180px] object-contain mx-auto mb-2 select-none"
            />
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Application Submitted!
            </h3>

            <p className="text-sm sm:text-base text-[#A7A7A7] max-w-md mx-auto leading-relaxed">
              Thank you for applying to Avaura for the{' '}
              <span className="text-white font-semibold">{formData.roleTitle}</span> role. Our talent team will review your application and contact you soon.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 rounded-xl bg-[#FF1F26] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="overflow-y-auto pr-1">
            {/* Header */}
            <div className="mb-6 space-y-1.5">
              <img
                src={brandLogo}
                alt="Avaura"
                className="h-9 w-auto max-w-[160px] object-contain mb-3 select-none"
              />
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Apply for a Career at{' '}
                <span className="text-[#FF1F26] text-glow">Avaura</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#A7A7A7]">
                Submit your profile for engineering, design, marketing, or operations roles.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2">
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#FF1F26]" />
                    Position / Role <span className="text-[#FF1F26]">*</span>
                  </label>
                  <select
                    name="roleTitle"
                    value={formData.roleTitle}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#24242A] text-white text-xs sm:text-sm focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select position / role (e.g. Full Stack Developer)</option>
                    {itRoles.map((role) => (
                      <option key={role} value={role} className="bg-[#0E0E12] text-white">
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    Experience Level <span className="text-[#FF1F26]">*</span>
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#24242A] text-white text-xs sm:text-sm focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select exp level (e.g. 1 - 3 Years)</option>
                    {experienceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0E0E12] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Full Name & Surname */}
              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FF1F26]" />
                  Full Name & Surname <span className="text-[#FF1F26]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First Name & Surname (e.g. Rahul Sharma)"
                  className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#24242A] text-white placeholder-[#666] text-xs sm:text-sm focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] focus:outline-none transition-all"
                />
              </div>

              {/* Email & Contact No. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FF1F26]" />
                    Email Address <span className="text-[#FF1F26]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address (e.g. rahul@example.com)"
                    className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#24242A] text-white placeholder-[#666] text-xs sm:text-sm focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FF1F26]" />
                    Contact No.
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter contact no. (e.g. +91 98765 43210)"
                    className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#24242A] text-white placeholder-[#666] text-xs sm:text-sm focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Portfolio / Links */}
              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#FF1F26]" />
                  Links (Portfolio / GitHub / LinkedIn)
                </label>
                <input
                  type="url"
                  name="portfolio"
                  disabled={isSubmitting}
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="Paste links (e.g. https://linkedin.com/in/username or github.com/...)"
                  className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#24242A] text-white placeholder-[#666] text-xs sm:text-sm focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] focus:outline-none transition-all"
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#FF1F26]" />
                  Resume / CV (PDF or DOCX)
                </label>
                <label className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#08080A] border border-dashed border-[#2A2A32] hover:border-[#FF1F26]/60 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5 text-xs text-[#888888]">
                    <Upload className="w-4 h-4 text-[#FF1F26]" />
                    <span className="text-white/80 font-medium">
                      {fileName || 'Upload resume / CV file (PDF, DOCX up to 10MB)'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    disabled={isSubmitting}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-[11px] px-2.5 py-1 rounded bg-[#17171C] text-[#AAAAAA] font-mono border border-white/10">
                    Browse
                  </span>
                </label>
              </div>

              {/* Cover Note / Message */}
              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                  Message / Cover Note <span className="text-[#FF1F26]">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  rows={3}
                  required
                  disabled={isSubmitting}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Enter your message or cover note (e.g. Tell us about your technical background and key achievements)..."
                  className="w-full p-3.5 rounded-xl bg-[#08080A] border border-[#24242A] text-white placeholder-[#666] text-xs sm:text-sm focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-[#A7A7A7] hover:text-white text-sm font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,31,38,0.35)] hover:shadow-[0_0_30px_rgba(255,31,38,0.55)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
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

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default ApplicationModal;
