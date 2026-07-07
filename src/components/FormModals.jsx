import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';

const FormModals = () => {
  const { formModal, closeFormModal } = useContext(ModalContext);

  useEffect(() => {
    if (formModal.type === 'success' || formModal.type === 'validation') {
      const timer = setTimeout(() => {
        closeFormModal();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [formModal.type, closeFormModal]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && formModal.type) {
        closeFormModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [formModal.type, closeFormModal]);

  if (!formModal.type) return null;

  const renderModal = () => {
    if (formModal.type === 'success') {
      return (
        <div className="form-modal form-modal-success active" role="alert" aria-live="polite">
          <div className="form-modal-overlay" onClick={closeFormModal}></div>
          <div className="form-modal-container form-modal-success-container" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-icon success-icon form-success-icon">
              <svg className="form-success-checkmark" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <div className="form-modal-content">
              <h3 className="form-modal-title">Message sent</h3>
              <p className="form-modal-message">Thank you for reaching out. I’ll get back to you as soon as possible.</p>
            </div>
            <button className="form-modal-close" aria-label="Close modal" onClick={closeFormModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      );
    }

    if (formModal.type === 'warning') {
      return (
        <div className="form-modal active" role="alert" aria-live="polite">
          <div className="form-modal-overlay" onClick={closeFormModal}></div>
          <div className="form-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-icon warning-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="form-modal-content">
              <h3 className="form-modal-title">Error Sending Message</h3>
              <p className="form-modal-message">Something went wrong. Please try again or contact me directly via email or phone.</p>
            </div>
            <button className="form-modal-close" aria-label="Close modal" onClick={closeFormModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      );
    }

    if (formModal.type === 'validation') {
      return (
        <div className="form-modal active" role="alert" aria-live="polite">
          <div className="form-modal-overlay" onClick={closeFormModal}></div>
          <div className="form-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-icon validation-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="form-modal-content">
              <h3 className="form-modal-title">Please Fill All Fields</h3>
              <p className="form-modal-message" id="validationMessage">
                {formModal.message || 'All fields are required. Please make sure to fill out all the form fields before submitting.'}
              </p>
            </div>
            <button className="form-modal-close" aria-label="Close modal" onClick={closeFormModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return renderModal();
};

export default FormModals;









