import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import Tooltip from './Tooltip';

const Footer = () => {
  const { openPrivacyTermsModal } = useContext(ModalContext);

  return (
    <footer className="footer-modern">
      <div className="container">
        <div className="footer-content-modern">
          <div className="footer-left">
            <p>&copy; 2024 Bereket Fikre. All rights reserved.</p>
          </div>
          <div className="footer-social">
            <div className="social-modern">
              <Tooltip text="View my Behance portfolio" position="top">
                <a href="https://www.behance.net/bereketfikre" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Behance">
                  <img 
                    src={`${process.env.PUBLIC_URL || ''}/assets/behance-svgrepo-com.svg`} 
                    alt="Behance - View Bereket Fikre's portfolio" 
                    className="social-icon-img" 
                    loading="lazy" 
                    width="24" 
                    height="24"
                    decoding="async"
                    sizes="24px"
                  />
                </a>
              </Tooltip>
              <Tooltip text="View my Freelancer profile" position="top">
                <a href="https://www.freelancer.com/u/bereketfikre" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Freelancer">
                  <img 
                    src={`${process.env.PUBLIC_URL || ''}/assets/freelancer-svgrepo-com.svg`} 
                    alt="Freelancer - View Bereket Fikre's profile" 
                    className="social-icon-img" 
                    loading="lazy" 
                    width="24" 
                    height="24"
                    decoding="async"
                    sizes="24px"
                  />
                </a>
              </Tooltip>
              <Tooltip text="View my Upwork profile" position="top">
                <a href="https://www.upwork.com/freelancers/~019189891a0638d811?mp_source=share" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Upwork">
                  <img 
                    src={`${process.env.PUBLIC_URL || ''}/assets/upwork-svgrepo-com.svg`} 
                    alt="Upwork - View Bereket Fikre's profile" 
                    className="social-icon-img" 
                    loading="lazy" 
                    width="24" 
                    height="24"
                    decoding="async"
                    sizes="24px"
                  />
                </a>
              </Tooltip>
              <Tooltip text="Connect on LinkedIn" position="top">
                <a href="https://www.linkedin.com/in/bereket-fikre-graphic-designer" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </Tooltip>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-links">
              <button 
                className="footer-link" 
                onClick={() => openPrivacyTermsModal('privacy')}
                aria-label="View Privacy Policy"
              >
                <span>Privacy</span>
              </button>
              <span className="footer-link-divider" aria-hidden="true">·</span>
              <button 
                className="footer-link" 
                onClick={() => openPrivacyTermsModal('terms')}
                aria-label="View Terms of Service"
              >
                <span>Terms of Service</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


