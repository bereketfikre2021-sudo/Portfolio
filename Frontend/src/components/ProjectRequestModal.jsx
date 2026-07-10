import React, { useState, useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

const ProjectRequestModal = () => {
  const { projectRequestModal, closeProjectRequestModal, showFormModal } = useContext(ModalContext);
  const modalRef = useRef(null);
  useFocusTrap(projectRequestModal?.isOpen, modalRef);
  
  // Announce modal opening to screen readers
  useEffect(() => {
    if (projectRequestModal?.isOpen) {
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        liveRegion.textContent = 'Project request form opened. Step 1 of 3.';
        setTimeout(() => {
          liveRegion.textContent = '';
        }, 1000);
      }
    }
  }, [projectRequestModal?.isOpen]);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    service_needed: '',
    budget_range: '',
    timeline: '',
    project_description: '',
    preferred_contact_method: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Announce step changes to screen readers
  useEffect(() => {
    if (projectRequestModal?.isOpen) {
      const announcement = `Step ${currentStep} of ${totalSteps}`;
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        liveRegion.textContent = announcement;
        setTimeout(() => {
          liveRegion.textContent = '';
        }, 1000);
      }
    }
  }, [currentStep, projectRequestModal?.isOpen, totalSteps]);

  const services = [
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'brand-identity', label: 'Brand Identity' },
    { id: 'ui-ux', label: 'UI/UX Design' },
    { id: 'web-design', label: 'Web Design' },
    { id: 'multiple', label: 'Multiple Services' },
    { id: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { id: 'under-1k', label: 'Under $1,000' },
    { id: '1k-5k', label: '$1,000 - $5,000' },
    { id: '5k-10k', label: '$5,000 - $10,000' },
    { id: '10k-25k', label: '$10,000 - $25,000' },
    { id: '25k-plus', label: '$25,000+' },
    { id: 'discuss', label: 'Prefer to discuss' }
  ];

  const timelines = [
    { id: 'asap', label: 'ASAP / Urgent' },
    { id: '1-month', label: 'Within 1 month' },
    { id: '2-3-months', label: '2-3 months' },
    { id: '3-6-months', label: '3-6 months' },
    { id: 'flexible', label: 'Flexible / No rush' }
  ];

  useEffect(() => {
    if (!projectRequestModal?.isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeProjectRequestModal();
      }
    };

    const handlePopState = () => {
      closeProjectRequestModal();
    };

    window.history.pushState({ modal: 'project-request' }, '');
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [projectRequestModal?.isOpen, closeProjectRequestModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({ ...prev, service_needed: serviceId }));
  };

  const handleBudgetSelect = (budgetId) => {
    setFormData(prev => ({ ...prev, budget_range: budgetId }));
  };

  const handleTimelineSelect = (timelineId) => {
    setFormData(prev => ({ ...prev, timeline: timelineId }));
  };

  const validateStep = (step) => {
    if (step === 1) {
      return formData.first_name.trim() && 
             formData.last_name.trim() && 
             formData.email.trim() && 
             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    }
    if (step === 2) {
      return formData.service_needed && formData.budget_range && formData.timeline;
    }
    if (step === 3) {
      return formData.project_description.trim().length >= 50;
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      let message = 'Please complete all required fields before continuing.';
      if (currentStep === 1 && !formData.email.trim()) {
        message = 'Please enter a valid email address.';
      } else if (currentStep === 3 && formData.project_description.trim().length < 50) {
        message = 'Please provide at least 50 characters describing your project.';
      }
      showFormModal('validation', message);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      showFormModal('validation', 'Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mandzwvb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          form_type: 'project_request',
          submitted_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          company: '',
          service_needed: '',
          budget_range: '',
          timeline: '',
          project_description: '',
          preferred_contact_method: 'email'
        });
        setCurrentStep(1);
        closeProjectRequestModal();
        showFormModal('success');
        setTimeout(() => {
          showFormModal(null);
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      showFormModal('warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!projectRequestModal?.isOpen) {
    return null;
  }

  return (
    <div 
      ref={modalRef}
      className="project-request-modal-wrapper"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-request-title"
      aria-describedby="project-request-description"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        visibility: 'visible !important',
        opacity: '1 !important',
        pointerEvents: 'auto',
        width: '100%',
        height: '100%'
      }}
    >
      <div 
        className="project-request-modal-backdrop" 
        onClick={closeProjectRequestModal}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 10, 31, 0.85)',
          backdropFilter: 'blur(10px)'
        }}
      ></div>
      <div 
        className="project-request-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 10001
        }}
      >
        <button 
          className="project-request-modal-close-btn" 
          onClick={closeProjectRequestModal}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(161, 194, 189, 0.1)',
            border: '1px solid rgba(161, 194, 189, 0.3)',
            color: '#E7F2EF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="project-request-header">
          <h2 id="project-request-title">Request a Project Quote</h2>
          <p id="project-request-description" style={{ fontSize: '1rem', color: '#A1C2BD', opacity: 1, marginBottom: '2rem', fontWeight: 400 }}>Let's discuss your project and get you a detailed quote</p>
          
          <div className="project-request-progress-bar" style={{ marginTop: '1.5rem' }}>
            <div className="progress-steps-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div 
                    className={`progress-step-circle ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: currentStep >= step ? '#A1C2BD' : 'rgba(231, 242, 239, 0.1)',
                      border: `2px solid ${currentStep >= step ? '#A1C2BD' : 'rgba(161, 194, 189, 0.3)'}`,
                      color: currentStep >= step ? '#19183B' : '#A1C2BD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      flexShrink: 0
                    }}
                  >
                    {currentStep > step ? '✓' : step}
                  </div>
                  {step < 3 && (
                    <div 
                      className={`progress-step-line ${currentStep > step ? 'active' : ''}`}
                      style={{
                        flex: 1,
                        height: '2px',
                        background: currentStep > step ? '#A1C2BD' : 'rgba(161, 194, 189, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="progress-text" style={{ fontSize: '0.875rem', color: '#A1C2BD', opacity: 1, fontWeight: 500, textAlign: 'center', fontFamily: 'Raleway, sans-serif' }}>Step {currentStep} of {totalSteps}</div>
          </div>
        </div>

        <form className="project-request-form-container" onSubmit={handleSubmit}>
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="form-step-content" style={{ minHeight: '300px', padding: '0' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#E7F2EF', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif' }}>Contact Information</h3>
              <p className="step-description" style={{ fontSize: '0.9375rem', color: '#A1C2BD', opacity: 1, marginBottom: '2rem', fontFamily: 'Raleway, sans-serif' }}>Let's start with your basic information</p>
              
              <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>First Name <span className="required-star" style={{ color: '#ff6b6b', marginLeft: '2px' }}>*</span></label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(231, 242, 239, 0.06)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(161, 194, 189, 0.3)', borderRadius: '10px', color: '#E7F2EF', fontSize: '1rem', fontFamily: 'Raleway, sans-serif', boxSizing: 'border-box', transition: 'all 0.3s ease', fontWeight: 400 }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>Last Name <span className="required-star" style={{ color: '#ff6b6b', marginLeft: '2px' }}>*</span></label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(231, 242, 239, 0.06)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(161, 194, 189, 0.3)', borderRadius: '10px', color: '#E7F2EF', fontSize: '1rem', fontFamily: 'Raleway, sans-serif', boxSizing: 'border-box', transition: 'all 0.3s ease', fontWeight: 400 }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>Email Address <span className="required-star" style={{ color: '#ff6b6b', marginLeft: '2px' }}>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(231, 242, 239, 0.08)', border: '1px solid rgba(161, 194, 189, 0.4)', borderRadius: '10px', color: '#E7F2EF', fontSize: '1rem', fontFamily: 'Raleway, sans-serif', boxSizing: 'border-box', transition: 'all 0.3s ease', fontWeight: 400 }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(231, 242, 239, 0.08)', border: '1px solid rgba(161, 194, 189, 0.4)', borderRadius: '10px', color: '#E7F2EF', fontSize: '1rem', fontFamily: 'Raleway, sans-serif', boxSizing: 'border-box', transition: 'all 0.3s ease', fontWeight: 400 }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>Company/Organization</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(231, 242, 239, 0.08)', border: '1px solid rgba(161, 194, 189, 0.4)', borderRadius: '10px', color: '#E7F2EF', fontSize: '1rem', fontFamily: 'Raleway, sans-serif', boxSizing: 'border-box', transition: 'all 0.3s ease', fontWeight: 400 }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>Preferred Contact Method</label>
                <select
                  name="preferred_contact_method"
                  value={formData.preferred_contact_method}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(231, 242, 239, 0.08)', border: '1px solid rgba(161, 194, 189, 0.4)', borderRadius: '10px', color: '#E7F2EF', fontSize: '1rem', fontFamily: 'Raleway, sans-serif', boxSizing: 'border-box', transition: 'all 0.3s ease', fontWeight: 400, cursor: 'pointer' }}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="telegram">Telegram</option>
                  <option value="either">Either</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="form-step-content" style={{ minHeight: '300px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#E7F2EF', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif' }}>Project Details</h3>
              <p className="step-description" style={{ fontSize: '0.9375rem', color: '#A1C2BD', opacity: 1, marginBottom: '2rem', fontFamily: 'Raleway, sans-serif' }}>Tell us about your project needs</p>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>Service Needed <span className="required-star" style={{ color: '#ff6b6b', marginLeft: '2px' }}>*</span></label>
                <div className="option-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      className={`option-button ${formData.service_needed === service.id ? 'selected' : ''}`}
                      onClick={() => handleServiceSelect(service.id)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '10px',
                        border: `2px solid ${formData.service_needed === service.id ? '#A1C2BD' : 'rgba(161, 194, 189, 0.3)'}`,
                        background: formData.service_needed === service.id ? 'rgba(161, 194, 189, 0.25)' : 'rgba(231, 242, 239, 0.06)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        color: formData.service_needed === service.id ? '#E7F2EF' : '#A1C2BD',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Raleway, sans-serif',
                        boxShadow: formData.service_needed === service.id ? '0 4px 12px rgba(161, 194, 189, 0.25)' : 'none'
                      }}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>Budget Range <span className="required-star" style={{ color: '#ff6b6b', marginLeft: '2px' }}>*</span></label>
                <div className="option-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {budgetRanges.map((budget) => (
                    <button
                      key={budget.id}
                      type="button"
                      className={`option-button ${formData.budget_range === budget.id ? 'selected' : ''}`}
                      onClick={() => handleBudgetSelect(budget.id)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '10px',
                        border: `2px solid ${formData.budget_range === budget.id ? '#A1C2BD' : 'rgba(161, 194, 189, 0.3)'}`,
                        background: formData.budget_range === budget.id ? 'rgba(161, 194, 189, 0.25)' : 'rgba(231, 242, 239, 0.06)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        color: formData.budget_range === budget.id ? '#E7F2EF' : '#A1C2BD',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Raleway, sans-serif',
                        boxShadow: formData.budget_range === budget.id ? '0 4px 12px rgba(161, 194, 189, 0.25)' : 'none'
                      }}
                    >
                      {budget.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>Project Timeline <span className="required-star" style={{ color: '#ff6b6b', marginLeft: '2px' }}>*</span></label>
                <div className="option-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {timelines.map((timeline) => (
                    <button
                      key={timeline.id}
                      type="button"
                      className={`option-button ${formData.timeline === timeline.id ? 'selected' : ''}`}
                      onClick={() => handleTimelineSelect(timeline.id)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '10px',
                        border: `2px solid ${formData.timeline === timeline.id ? '#A1C2BD' : 'rgba(161, 194, 189, 0.3)'}`,
                        background: formData.timeline === timeline.id ? 'rgba(161, 194, 189, 0.25)' : 'rgba(231, 242, 239, 0.06)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        color: formData.timeline === timeline.id ? '#E7F2EF' : '#A1C2BD',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Raleway, sans-serif',
                        boxShadow: formData.timeline === timeline.id ? '0 4px 12px rgba(161, 194, 189, 0.25)' : 'none'
                      }}
                    >
                      {timeline.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="form-step-content" style={{ minHeight: '300px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#E7F2EF', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif' }}>Project Description</h3>
              <p className="step-description" style={{ fontSize: '0.9375rem', color: '#A1C2BD', opacity: 1, marginBottom: '2rem', fontFamily: 'Raleway, sans-serif' }}>Describe your project in detail</p>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#A1C2BD', marginBottom: '0.75rem', fontFamily: 'Raleway, sans-serif', opacity: 1 }}>
                  Project Description <span className="required-star" style={{ color: '#ff6b6b', marginLeft: '2px' }}>*</span>
                  <span className="char-counter" style={{ marginLeft: '0.5rem', fontSize: '0.75rem', opacity: 0.8, fontWeight: 400 }}>({formData.project_description.length} / 50 minimum)</span>
                </label>
                <textarea
                  name="project_description"
                  rows="6"
                  value={formData.project_description}
                  onChange={handleChange}
                  required
                  placeholder="Please describe your project goals, target audience, design preferences, and any specific requirements..."
                  style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(231, 242, 239, 0.06)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(161, 194, 189, 0.3)', borderRadius: '10px', color: '#E7F2EF', fontSize: '1rem', fontFamily: 'Raleway, sans-serif', boxSizing: 'border-box', resize: 'vertical', minHeight: '140px', transition: 'all 0.3s ease', fontWeight: 400, lineHeight: '1.6' }}
                ></textarea>
                <small className="field-help" style={{ display: 'block', fontSize: '0.8125rem', color: '#A1C2BD', opacity: 0.85, marginTop: '0.75rem', fontFamily: 'Raleway, sans-serif' }}>Minimum 50 characters. The more details you provide, the more accurate our quote will be.</small>
              </div>
            </div>
          )}

          <div className="form-navigation-buttons" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(161, 194, 189, 0.2)' }}>
            {currentStep > 1 && (
              <button 
                type="button" 
                className="btn-nav btn-nav-back" 
                onClick={handleBack} 
                disabled={isSubmitting}
                style={{ 
                  padding: '1rem 2.5rem', 
                  borderRadius: '10px', 
                  fontWeight: 600, 
                  fontSize: '1rem', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  background: 'transparent', 
                  color: '#A1C2BD', 
                  border: '2px solid rgba(161, 194, 189, 0.4)', 
                  fontFamily: 'Raleway, sans-serif',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.6 : 1
                }}
                onMouseEnter={(e) => !isSubmitting && (e.target.style.borderColor = '#A1C2BD', e.target.style.color = '#E7F2EF', e.target.style.background = 'rgba(161, 194, 189, 0.1)')}
                onMouseLeave={(e) => !isSubmitting && (e.target.style.borderColor = 'rgba(161, 194, 189, 0.4)', e.target.style.color = '#A1C2BD', e.target.style.background = 'transparent')}
              >
                Back
              </button>
            )}
            <div style={{ flex: 1 }}></div>
            {currentStep < totalSteps ? (
              <button 
                type="button" 
                className="btn-nav btn-nav-next" 
                onClick={handleNext}
                style={{ 
                  padding: '1rem 2.5rem', 
                  borderRadius: '10px', 
                  fontWeight: 600, 
                  fontSize: '1rem', 
                  cursor: 'pointer', 
                  background: '#A1C2BD', 
                  color: '#19183B', 
                  border: 'none', 
                  fontFamily: 'Raleway, sans-serif',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(161, 194, 189, 0.3)'
                }}
                onMouseEnter={(e) => (e.target.style.background = '#8AEA92', e.target.style.boxShadow = '0 6px 16px rgba(138, 234, 146, 0.4)', e.target.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.target.style.background = '#A1C2BD', e.target.style.boxShadow = '0 4px 12px rgba(161, 194, 189, 0.3)', e.target.style.transform = 'translateY(0)')}
              >
                Next Step →
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn-nav btn-nav-submit" 
                disabled={isSubmitting}
                style={{ 
                  padding: '1rem 2.5rem', 
                  borderRadius: '10px', 
                  fontWeight: 600, 
                  fontSize: '1rem', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  background: '#A1C2BD', 
                  color: '#19183B', 
                  border: 'none', 
                  opacity: isSubmitting ? 0.6 : 1, 
                  fontFamily: 'Raleway, sans-serif',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(161, 194, 189, 0.3)'
                }}
                onMouseEnter={(e) => !isSubmitting && (e.target.style.background = '#8AEA92', e.target.style.boxShadow = '0 6px 16px rgba(138, 234, 146, 0.4)', e.target.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => !isSubmitting && (e.target.style.background = '#A1C2BD', e.target.style.boxShadow = '0 4px 12px rgba(161, 194, 189, 0.3)', e.target.style.transform = 'translateY(0)')}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request →'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectRequestModal;

