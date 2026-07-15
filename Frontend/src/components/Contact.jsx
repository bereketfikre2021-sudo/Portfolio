import React, { useEffect, useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { trackContactForm, trackExternalLink } from '../utils/analytics';

const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  'http://localhost:5000/api';

const FORMSPREE_ENDPOINT = `${API_BASE}/contact`;

const CONTACT_CHANNELS = [
  {
    id: 'phone',
    label: 'Phone',
    value: '+251 923 988 838',
    href: 'tel:+251923988838',
    external: false,
    ariaLabel: 'Call +251 923 988 838',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@Believeandforward',
    href: 'https://t.me/Believeandforward',
    external: true,
    ariaLabel: 'Telegram (opens in new window)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.54-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    value: 'bereketfikre2021@gmail.com',
    href: 'mailto:bereketfikre2021@gmail.com',
    external: false,
    ariaLabel: 'Send email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+251 923 988 838',
    href: 'https://wa.me/251923988838',
    external: true,
    ariaLabel: 'WhatsApp (opens in new window)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'bereket-fikre-graphic-designer',
    href: 'https://www.linkedin.com/in/bereket-fikre-graphic-designer',
    external: true,
    ariaLabel: 'LinkedIn (opens in new window)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const { showFormModal, formModal } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const ensureVisibility = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const aosElements = contactSection.querySelectorAll('[data-aos]');
        aosElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          el.style.pointerEvents = 'auto';
        });

        const sectionIntro = contactSection.querySelector('.section-intro');
        if (sectionIntro) {
          sectionIntro.style.opacity = '1';
          sectionIntro.style.visibility = 'visible';
          sectionIntro.style.display = 'flex';
        }

        const contentWrapper = contactSection.querySelector('.contact-content-wrapper');
        if (contentWrapper) {
          contentWrapper.style.opacity = '1';
          contentWrapper.style.visibility = 'visible';
          contentWrapper.style.display = 'flex';
        }
      }
    };

    if (isMobile) {
      ensureVisibility();
      return;
    }

    const refreshAOS = () => {
      if (!window.AOS) return;
      window.AOS.refresh();
      const contactSection = document.getElementById('contact');
      if (!contactSection) return;
      requestAnimationFrame(() => {
        const rect = contactSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          const aosElements = contactSection.querySelectorAll('[data-aos]');
          aosElements.forEach((el) => {
            if (window.AOS) window.AOS.animate(el);
          });
        }
      });
    };

    refreshAOS();
    const timer1 = setTimeout(refreshAOS, 100);
    const timer2 = setTimeout(refreshAOS, 300);
    const fallbackTimer = setTimeout(ensureVisibility, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!formModal.type && showSuccessState) {
      setShowSuccessState(false);
    }
  }, [formModal.type, showSuccessState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      showFormModal('validation', 'Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormModal('validation', 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setShowSuccessState(false);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          form_type: 'contact',
          _subject: `Portfolio Contact: ${subject.trim()}`,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.ok === true || data.next)) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setShowSuccessState(true);
        trackContactForm('contact_form');
        showFormModal('success');
      } else {
        throw new Error(data.error || 'Form submission failed');
      }
    } catch (error) {
      showFormModal('warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact contact-minimal" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-intro contact-intro-minimal" data-aos="fade-up">
          <span className="section-number desktop-number">08</span>
          <span className="section-number mobile-number">08</span>
          <div className="section-header">
            <span className="section-label">Contact</span>
            <h2 id="contact-heading" className="section-title">
              <span className="title-main">Get in</span>
              <span className="title-accent">Touch</span>
            </h2>
          </div>
        </div>

        <div className="contact-content-wrapper">
          <div className="contact-info-wrapper" data-aos="fade-right">
            <p className="contact-channels-heading">Reach me</p>
            <ul className="contact-channels-list">
              {CONTACT_CHANNELS.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    className="contact-channel-link"
                    aria-label={channel.ariaLabel}
                    onClick={() => channel.external && trackExternalLink(channel.id, channel.href)}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className="contact-channel-icon">{channel.icon}</span>
                    <span className="contact-channel-text">
                      <span className="contact-channel-label">{channel.label}</span>
                      <span className="contact-channel-value">{channel.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-form-wrapper" data-aos="fade-left">
            {showSuccessState && (
              <div className="contact-form-success-inline" role="status" aria-live="polite">
                <span className="contact-form-success-check">✓</span>
                <span>Message sent!</span>
              </div>
            )}
            <form
              className={`contact-form-simple ${showSuccessState ? 'form-submitted' : ''}`}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    autoComplete="name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  disabled={isSubmitting}
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="btn-contact-submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
