import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const PrivacyTermsModal = () => {
  const { privacyTermsModal, closePrivacyTermsModal } = useContext(ModalContext);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && privacyTermsModal.isOpen) {
        closePrivacyTermsModal();
      }
    };

    const handlePopState = () => {
      if (privacyTermsModal.isOpen) {
        closePrivacyTermsModal();
      }
    };

    if (privacyTermsModal.isOpen) {
      window.history.pushState({ modal: 'privacyTerms' }, '');
      window.addEventListener('popstate', handlePopState);
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [privacyTermsModal.isOpen, closePrivacyTermsModal]);

  if (!privacyTermsModal.isOpen) return null;

  const privacyContent = {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: December 2024',
    sections: [
      {
        heading: 'Information We Collect',
        content: 'We collect information that you provide directly to us, such as when you fill out our contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and any messages you send us.'
      },
      {
        heading: 'How We Use Your Information',
        content: 'We use the information we collect to respond to your inquiries, provide our services, send you updates about our work, and improve our website experience. We do not sell, trade, or rent your personal information to third parties.'
      },
      {
        heading: 'Data Security',
        content: 'We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.'
      },
      {
        heading: 'Cookies and Tracking',
        content: 'Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some functionality.'
      },
      {
        heading: 'Your Rights',
        content: 'You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us using the information provided on our contact page.'
      },
      {
        heading: 'Contact Us',
        content: 'If you have any questions about this Privacy Policy, please contact us through our contact form or email us directly.'
      }
    ]
  };

  const termsContent = {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: December 2024',
    sections: [
      {
        heading: 'Acceptance of Terms',
        content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this website.'
      },
      {
        heading: 'Use License',
        content: 'Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose, or attempt to decompile or reverse engineer any software contained on the website.'
      },
      {
        heading: 'Intellectual Property',
        content: 'All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Bereket Fikre and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without express written permission.'
      },
      {
        heading: 'Service Availability',
        content: 'We strive to keep the website available 24/7, but we do not guarantee uninterrupted access. The website may be temporarily unavailable due to maintenance, updates, or technical issues beyond our control.'
      },
      {
        heading: 'Limitation of Liability',
        content: 'In no event shall Bereket Fikre or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.'
      },
      {
        heading: 'Revisions and Errata',
        content: 'The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.'
      },
      {
        heading: 'Contact Information',
        content: 'If you have any questions about these Terms of Service, please contact us through our contact form or email us directly.'
      }
    ]
  };

  const content = privacyTermsModal.type === 'privacy' ? privacyContent : termsContent;

  return (
    <div 
      className={`privacy-terms-modal ${privacyTermsModal.isOpen ? 'active' : ''}`}
      role="dialog"
      aria-labelledby="privacyTermsModalTitle"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={closePrivacyTermsModal}></div>
      <div className="privacy-terms-modal-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="privacy-terms-modal-close" 
          aria-label="Close modal" 
          onClick={closePrivacyTermsModal}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="privacy-terms-modal-content">
          <div className="privacy-terms-modal-header">
            <h2 id="privacyTermsModalTitle" className="privacy-terms-modal-title">{content.title}</h2>
            <p className="privacy-terms-modal-date">{content.lastUpdated}</p>
          </div>
          <div className="privacy-terms-modal-body">
            {content.sections.map((section, index) => (
              <div key={index} className="privacy-terms-section">
                <h3 className="privacy-terms-section-heading">{section.heading}</h3>
                <p className="privacy-terms-section-content">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTermsModal;

