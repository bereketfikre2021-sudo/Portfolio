import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import Tooltip from './Tooltip';

const Footer = () => {
  const { openPrivacyTermsModal } = useContext(ModalContext);

  return (
    <footer className="footer-modern" role="contentinfo">
      <div className="container">
        <div className="footer-content-modern">
          <div className="footer-left">
            <p>&copy; 2024 Bereket Fikre. All rights reserved.</p>
          </div>
          <div className="footer-social">
            <div className="social-modern">
              <Tooltip text="View my Behance portfolio" position="top">
                <a href="https://www.behance.net/bereketfikre" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Behance (opens in new window)">
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
                <a href="https://www.freelancer.com/u/bereketfikre" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Freelancer (opens in new window)">
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
                <a href="https://www.upwork.com/freelancers/~019189891a0638d811?mp_source=share" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Upwork (opens in new window)">
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
              <Tooltip text="View my Dribbble portfolio" position="top">
                <a href="https://dribbble.com/bereketfikre" target="_blank" rel="noopener noreferrer" className="social-item" aria-label="Dribbble (opens in new window)">
                  <img 
                    src={`${process.env.PUBLIC_URL || ''}/assets/dribble-svgrepo-com.svg`} 
                    alt="Dribbble - View Bereket Fikre's portfolio" 
                    className="social-icon-img" 
                    loading="lazy" 
                    width="24" 
                    height="24"
                    decoding="async"
                    sizes="24px"
                  />
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


