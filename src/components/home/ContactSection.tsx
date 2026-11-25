import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, AlertCircle, ArrowUpRight } from 'lucide-react';
import { OWNER_INFO } from '../../data/navigation';
import { MagneticButton } from '../common/MagneticButton';
import { useCursor } from '../../context/CursorContext';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import confetti from 'canvas-confetti';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'copied'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please share a brief message (at least 10 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Honest handling: No fake backend claiming "Message sent via cloud server"
    // Instead, pre-fill mailto URL and trigger default client, with copy fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FF604A', '#242424', '#FAF8F2']
      });

      const mailtoUrl = `mailto:${OWNER_INFO.social.email}?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OWNER_INFO.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 bg-[#F7F5F0] border-t border-[#E4E0D8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 font-mono text-xs text-[#FF604A] tracking-widest uppercase mb-3">
            <span className="font-bold">[08]</span>
            <span>GET IN TOUCH</span>
            <span className="w-12 h-[1px] bg-[#E4E0D8]" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#181818] leading-[1.05] mb-4">
            HAVE AN IDEA?
            <br />
            <span className="text-[#FF604A]">LET'S BUILD SOMETHING.</span>
          </h2>

          <p className="font-sans text-base md:text-lg text-[#77746F] leading-relaxed">
            Open to meaningful collaborations, interesting projects and opportunities to create something impactful.
          </p>
        </div>

        {/* 2-Column Layout: Direct Details Left, Professional Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: 5 Cols Direct Reach & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs space-y-6">
              <span className="font-mono text-xs text-[#77746F] uppercase tracking-widest block">
                DIRECT COMMUNICATION
              </span>

              {/* Email Card with One-Click Copy */}
              <div className="p-4 rounded-2xl bg-[#F0EEE8] border border-[#E4E0D8] flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] flex items-center justify-center text-[#FF604A] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-[#77746F] uppercase block">
                      OFFICIAL EMAIL
                    </span>
                    <a
                      href={`mailto:${OWNER_INFO.social.email}`}
                      className="font-display font-semibold text-xs sm:text-sm text-[#181818] hover:text-[#FF604A] truncate block"
                    >
                      {OWNER_INFO.social.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className="p-2 rounded-lg bg-[#FFFFFF] hover:bg-[#FF604A] hover:text-white transition-colors shrink-0 ml-2"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-[#F0EEE8] border border-[#E4E0D8]">
                <span className="text-[10px] font-mono text-[#77746F] uppercase block mb-1">
                  LOCATION & TIMEZONE
                </span>
                <p className="font-display font-semibold text-sm text-[#181818]">
                  {OWNER_INFO.location} (IST / UTC +5:30)
                </p>
                <p className="font-sans text-xs text-[#77746F] mt-1">
                  Available for remote software collaborations and technology initiatives.
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#E4E0D8]">
                <span className="text-xs font-mono uppercase tracking-widest text-[#77746F] block mb-3">
                  NETWORK CHANNELS
                </span>
                <div className="space-y-2">
                  <a
                    href={OWNER_INFO.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={resetCursor}
                    className="p-3 rounded-xl border border-[#E4E0D8] hover:border-[#FF604A] flex items-center justify-between text-xs font-display font-semibold text-[#181818] hover:text-[#FF604A] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-[#181818]" />
                      GitHub Profile & Code Repositories
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={OWNER_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={resetCursor}
                    className="p-3 rounded-xl border border-[#E4E0D8] hover:border-[#FF604A] flex items-center justify-between text-xs font-display font-semibold text-[#181818] hover:text-[#FF604A] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                      LinkedIn Professional Network
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 7 Cols Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E4E0D8]">
                <h3 className="font-display font-bold text-xl text-[#181818]">
                  TRANSMIT AN INQUIRY
                </h3>
                <span className="font-mono text-xs text-[#FF604A]">
                  Direct Routing
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-[#181818] mb-1.5 font-semibold">
                    YOUR NAME <span className="text-[#FF604A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name or organisation"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F0EEE8] border text-sm font-sans text-[#181818] focus:bg-white focus:outline-none transition-colors ${
                      errors.name ? 'border-[#FF604A]' : 'border-[#E4E0D8] focus:border-[#FF604A]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-[#FF604A] flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#181818] mb-1.5 font-semibold">
                    YOUR EMAIL <span className="text-[#FF604A]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@organisation.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F0EEE8] border text-sm font-sans text-[#181818] focus:bg-white focus:outline-none transition-colors ${
                      errors.email ? 'border-[#FF604A]' : 'border-[#E4E0D8] focus:border-[#FF604A]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#FF604A] flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-[#181818] mb-1.5 font-semibold">
                    SUBJECT <span className="text-[#FF604A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Project / Damayanti Crest Collaboration"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F0EEE8] border text-sm font-sans text-[#181818] focus:bg-white focus:outline-none transition-colors ${
                      errors.subject ? 'border-[#FF604A]' : 'border-[#E4E0D8] focus:border-[#FF604A]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-[#FF604A] flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-[#181818] mb-1.5 font-semibold">
                    PROJECT DETAILS OR INQUIRY <span className="text-[#FF604A]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or idea..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#F0EEE8] border text-sm font-sans text-[#181818] focus:bg-white focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-[#FF604A]' : 'border-[#E4E0D8] focus:border-[#FF604A]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-[#FF604A] flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Architecture Note */}
                <div className="p-3 rounded-xl bg-[#F0EEE8] border border-[#E4E0D8] text-[11px] font-sans text-[#77746F] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF604A] shrink-0 mt-1" />
                  <span>
                    <strong>Architecture Note:</strong> Submissions format a secure pre-filled draft directly into your default email software to guarantee delivery without intermediary telemetry.
                  </span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs tracking-wider"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'PREPARING DISPATCH...' : 'SEND MESSAGE VIA EMAIL'}</span>
                  </MagneticButton>
                </div>

                {/* Success Feedback */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Inquiry prepared! Your mail application has opened with your message. If it did not launch automatically, feel free to copy the email address directly.
                    </span>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
