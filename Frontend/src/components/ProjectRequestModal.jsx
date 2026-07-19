import React, { useState, useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

const EMPTY = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  preferred_contact_method: 'email',
  service_needed: '',
  budget_range: '',
  timeline: '',
  project_description: '',
};

const ProjectRequestModal = () => {
  const { projectRequestModal, closeProjectRequestModal, showFormModal } = useContext(ModalContext);
  const modalRef = useRef(null);
  useFocusTrap(projectRequestModal?.isOpen, modalRef);

  const [form, setForm]           = useState(EMPTY);
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isOpen = projectRequestModal?.isOpen;

  useEffect(() => {
    if (isOpen) { setForm(EMPTY); setErrors({}); }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeProjectRequestModal();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeProjectRequestModal]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'Required';
    if (!form.last_name.trim())  e.last_name  = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.service_needed) e.service_needed = 'Please select a service';
    if (!form.budget_range)   e.budget_range   = 'Please select a budget';
    if (!form.timeline)       e.timeline       = 'Please select a timeline';
    if (form.project_description.trim().length < 20)
      e.project_description = 'Please add at least 20 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const API_BASE =
        (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
        'http://localhost:5000/api';

      const res = await fetch(`${API_BASE}/project-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          form_type: 'project_request',
          submitted_at: new Date().toISOString(),
        }),
      });

      // Always close the modal first regardless of outcome
      closeProjectRequestModal();

      if (res.ok) {
        // Brief success toast — auto-dismisses after 4 s
        showFormModal('success');
        setTimeout(() => showFormModal(null), 4000);
      } else {
        showFormModal('warning');
        setTimeout(() => showFormModal(null), 4000);
      }
    } catch {
      closeProjectRequestModal();
      showFormModal('warning');
      setTimeout(() => showFormModal(null), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="prq-modal" role="dialog" aria-modal="true" aria-labelledby="prq-title" ref={modalRef}>
      <div className="prq-backdrop" onClick={closeProjectRequestModal} />

      <div className="prq-container" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="prq-close" onClick={closeProjectRequestModal} aria-label="Close modal" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="prq-header">
          <span className="prq-eyebrow">Let's work together</span>
          <h2 id="prq-title" className="prq-title">Request a Quote</h2>
          <p className="prq-subtitle">Fill in the details and I'll get back to you within 24 hours.</p>
        </div>

        {/* Form */}
        <form className="prq-body" onSubmit={handleSubmit} noValidate>

          {/* Row: names */}
          <div className="prq-row-2">
            <div className={`prq-field ${errors.first_name ? 'has-error' : ''}`}>
              <label className="prq-label">First Name <span className="prq-req">*</span></label>
              <input className="prq-input" value={form.first_name} onChange={set('first_name')} placeholder="Bereket" autoFocus />
              {errors.first_name && <p className="prq-err">{errors.first_name}</p>}
            </div>
            <div className={`prq-field ${errors.last_name ? 'has-error' : ''}`}>
              <label className="prq-label">Last Name <span className="prq-req">*</span></label>
              <input className="prq-input" value={form.last_name} onChange={set('last_name')} placeholder="Fikre" />
              {errors.last_name && <p className="prq-err">{errors.last_name}</p>}
            </div>
          </div>

          {/* Email */}
          <div className={`prq-field ${errors.email ? 'has-error' : ''}`}>
            <label className="prq-label">Email <span className="prq-req">*</span></label>
            <input className="prq-input" type="email" value={form.email} onChange={set('email')} placeholder="hello@example.com" />
            {errors.email && <p className="prq-err">{errors.email}</p>}
          </div>

          {/* Row: phone + company */}
          <div className="prq-row-2">
            <div className="prq-field">
              <label className="prq-label">Phone</label>
              <input className="prq-input" type="tel" value={form.phone} onChange={set('phone')} placeholder="+251 9xx xxx xxx" />
            </div>
            <div className="prq-field">
              <label className="prq-label">Company</label>
              <input className="prq-input" value={form.company} onChange={set('company')} placeholder="Optional" />
            </div>
          </div>

          {/* Row: service + budget */}
          <div className="prq-row-2">
            <div className={`prq-field ${errors.service_needed ? 'has-error' : ''}`}>
              <label className="prq-label">Service <span className="prq-req">*</span></label>
              <select className="prq-select" value={form.service_needed} onChange={set('service_needed')}>
                <option value="">Select a service…</option>
                <option value="brand-identity">Brand Identity</option>
                <option value="digital-design">Digital Design</option>
                <option value="print-marketing">Print &amp; Marketing</option>
                <option value="creative-direction">Creative Direction</option>
                <option value="multiple">Multiple Services</option>
                <option value="other">Other / Not Sure</option>
              </select>
              {errors.service_needed && <p className="prq-err">{errors.service_needed}</p>}
            </div>
            <div className={`prq-field ${errors.budget_range ? 'has-error' : ''}`}>
              <label className="prq-label">Budget <span className="prq-req">*</span></label>
              <select className="prq-select" value={form.budget_range} onChange={set('budget_range')}>
                <option value="">Select a range…</option>
                <option value="under-1k">Under $1,000</option>
                <option value="1k-5k">$1,000 – $5,000</option>
                <option value="5k-10k">$5,000 – $10,000</option>
                <option value="10k-25k">$10,000 – $25,000</option>
                <option value="25k-plus">$25,000+</option>
                <option value="discuss">Prefer to discuss</option>
              </select>
              {errors.budget_range && <p className="prq-err">{errors.budget_range}</p>}
            </div>
          </div>

          {/* Row: timeline + contact method */}
          <div className="prq-row-2">
            <div className={`prq-field ${errors.timeline ? 'has-error' : ''}`}>
              <label className="prq-label">Timeline <span className="prq-req">*</span></label>
              <select className="prq-select" value={form.timeline} onChange={set('timeline')}>
                <option value="">Select timeline…</option>
                <option value="asap">ASAP / Urgent</option>
                <option value="1-month">Within 1 month</option>
                <option value="2-3-months">2 – 3 months</option>
                <option value="3-6-months">3 – 6 months</option>
                <option value="flexible">Flexible</option>
              </select>
              {errors.timeline && <p className="prq-err">{errors.timeline}</p>}
            </div>
            <div className="prq-field">
              <label className="prq-label">Preferred contact</label>
              <select className="prq-select" value={form.preferred_contact_method} onChange={set('preferred_contact_method')}>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="telegram">Telegram</option>
                <option value="either">Either</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className={`prq-field ${errors.project_description ? 'has-error' : ''}`}>
            <label className="prq-label">Project description <span className="prq-req">*</span></label>
            <textarea
              className="prq-textarea"
              rows={4}
              value={form.project_description}
              onChange={set('project_description')}
              placeholder="Briefly describe your goals, target audience, and any style preferences…"
            />
            {errors.project_description && <p className="prq-err">{errors.project_description}</p>}
          </div>

          {/* Submit */}
          <button type="submit" className="prq-btn-submit" disabled={submitting}>
            {submitting ? (
              <><span className="prq-spinner" /> Sending…</>
            ) : (
              'Send Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectRequestModal;
