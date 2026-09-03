import React, { useState, useRef } from 'react';
import {
  Send,
  Upload,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Briefcase,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  Loader2,
  Award
} from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import { careerService } from '../../services';

const CareerApplyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleTitle: 'AI & Deep Learning Engineer',
    experience: '3-5 Years',
    portfolioUrl: '',
    linkedinUrl: '',
    resumeUrl: '',
    coverLetter: '',
  });

  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState([]);
  const nameInputRef = useRef(null);

  const availableRoles = [
    'AI & Deep Learning Engineer',
    'Autonomous Agents Researcher',
    'Full Stack AI Engineer',
    'MLOps & Distributed Systems Engineer',
    'Applied LLM / NLP Engineer',
    'UI/UX Product Designer (AI Systems)',
    'Technical Product Manager',
    'General Application / Open Role',
  ];

  const experienceLevels = [
    'Fresh Graduate / Student',
    '1 - 3 Years',
    '3 - 5 Years',
    '5 - 8 Years (Senior)',
    '8+ Years (Staff / Principal / Lead)',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      if (!formData.resumeUrl) {
        setFormData((prev) => ({
          ...prev,
          resumeUrl: `https://uploads.neverquit.ai/resumes/${file.name}`,
        }));
      }
    }
  };

  const validateClientSide = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return false;
    }
    const letter = formData.coverLetter.trim();
    if (!letter || letter.length < 10) {
      setErrorMessage('Please provide a brief introduction or cover note (minimum 10 characters).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage('');
    setFieldErrors([]);

    if (!validateClientSide()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        role: formData.roleTitle,
        experience: formData.experience,
        portfolio: formData.portfolioUrl.trim() || formData.linkedinUrl.trim() || undefined,
        resume: fileName || formData.resumeUrl.trim() || undefined,
        introduction: formData.coverLetter.trim(),
      };

      await careerService.submitApplication(payload);

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        roleTitle: 'AI & Deep Learning Engineer',
        experience: '3-5 Years',
        portfolioUrl: '',
        linkedinUrl: '',
        resumeUrl: '',
        coverLetter: '',
      });
      setFileName('');
    } catch (err) {
      console.error('Career application submission error:', err);
      const friendlyMessage =
        err.status === 400 && err.message
          ? err.message
          : 'Unable to submit your application right now. Please check the fields and try again.';

      setErrorMessage(friendlyMessage);
      if (err.errors && Array.isArray(err.errors)) {
        setFieldErrors(err.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    setFieldErrors([]);
    setFileName('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      roleTitle: 'AI & Deep Learning Engineer',
      experience: '3-5 Years',
      portfolioUrl: '',
      linkedinUrl: '',
      resumeUrl: '',
      coverLetter: '',
    });
  };

  return (
    <section id="apply-form" className="py-20 lg:py-28 relative scroll-mt-24">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <Badge icon={Sparkles}>TALENT APPLICATION</Badge>

          <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-tight">
            Apply to Join{' '}
            <span className="text-[#FF1F26] text-glow inline-block">NeverquiT AI</span>
          </h2>

          <p className="text-sm sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            Whether you are an LLM architect, distributed systems engineer, or visionary designer — submit your details below to begin the application process.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="max-w-4xl mx-auto relative rounded-[22px] sm:rounded-[28px] bg-[#0c0c0f]/95 border border-[#242424] hover:border-[#FF1F26]/35 backdrop-blur-xl p-5 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.95)] transition-all duration-400 overflow-hidden text-left">
          
          {/* Subtle Ambient Red Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF1F26]/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF1F26]/4 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/50 to-transparent" />

          {isSubmitted ? (
            /* Success State */
            <div className="py-14 text-center space-y-6 animate-in fade-in zoom-in-95 duration-400">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Application Received!
                </h3>
                <p className="text-base text-[#A7A7A7] max-w-lg mx-auto leading-relaxed">
                  Thank you for applying to NeverquiT AI. Our talent and technical leadership team will review your profile and reach out within 48-72 business hours.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4">
                <Button
                  onClick={handleReset}
                  variant="primary"
                  size="md"
                  icon={false}
                >
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Header Status Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#1D1D1D] gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF1F26] animate-pulse" />
                  <span className="text-sm font-semibold text-white">
                    Direct Engineering & Talent Intake
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF1F26]" />
                  <span>Confidential & Direct Evaluation</span>
                </div>
              </div>

              {/* Error Message Alert */}
              <ErrorMessage
                message={errorMessage}
                errors={fieldErrors}
                variant="banner"
              />

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    Full Name <span className="text-[#FF1F26]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      ref={nameInputRef}
                      type="text"
                      name="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050507] border border-[#242424] text-white placeholder-[#555555] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    Email Address <span className="text-[#FF1F26]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050507] border border-[#242424] text-white placeholder-[#555555] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Role Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050507] border border-[#242424] text-white placeholder-[#555555] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    Primary Role / Focus Area <span className="text-[#FF1F26]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666]">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <select
                      name="roleTitle"
                      disabled={isSubmitting}
                      value={formData.roleTitle}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050507] border border-[#242424] text-white text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 cursor-pointer disabled:opacity-60 appearance-none"
                    >
                      {availableRoles.map((role, idx) => (
                        <option key={idx} value={role} className="bg-[#101014] text-white">
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Experience Level & LinkedIn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    Experience Level <span className="text-[#FF1F26]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666]">
                      <Award className="w-4 h-4" />
                    </div>
                    <select
                      name="experience"
                      disabled={isSubmitting}
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050507] border border-[#242424] text-white text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 cursor-pointer disabled:opacity-60 appearance-none"
                    >
                      {experienceLevels.map((lvl, idx) => (
                        <option key={idx} value={lvl} className="bg-[#101014] text-white">
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                    LinkedIn / Portfolio / GitHub Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666]">
                      <LinkIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="url"
                      name="portfolioUrl"
                      disabled={isSubmitting}
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username or github.com"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050507] border border-[#242424] text-white placeholder-[#555555] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Resume / CV Attachment & Link */}
              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                  Resume / CV File (PDF / DOCX)
                </label>
                <label className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#050507] border border-dashed border-[#2A2A2A] hover:border-[#FF1F26]/60 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#888888]">
                    <Upload className="w-4 h-4 text-[#FF1F26] group-hover:scale-110 transition-transform" />
                    <span className="truncate max-w-xs sm:max-w-md text-white/90">
                      {fileName || 'Click to browse and upload resume (max 10MB)'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    disabled={isSubmitting}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-xs px-3 py-1.5 rounded-lg bg-[#18181F] text-[#AAAAAA] group-hover:text-white border border-[#2A2A2A] font-mono transition-colors">
                    Browse File
                  </span>
                </label>
              </div>

              {/* Row 5: Cover Note / Introduction */}
              <div>
                <label className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                  Introduction / Why NeverquiT AI? <span className="text-[#FF1F26]">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  rows={4}
                  required
                  disabled={isSubmitting}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Share a brief overview of your technical background, projects you're proud of, and why you'd like to work with NeverquiT AI..."
                  className="w-full p-4 rounded-xl bg-[#050507] border border-[#242424] text-white placeholder-[#555555] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 resize-none disabled:opacity-60"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-1 flex items-center justify-center gap-2 text-xs text-[#737373]">
                <ShieldCheck className="w-4 h-4 text-[#FF1F26]" />
                <span>Zero spam policy. Your details are reviewed strictly by our internal engineering leads.</span>
              </div>

            </form>
          )}

        </div>

      </Container>
    </section>
  );
};

export default CareerApplyForm;
