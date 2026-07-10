import React, { createContext, useState, useCallback, useMemo } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [portfolioModal, setPortfolioModal] = useState({ isOpen: false, projectId: null });
  const [caseStudyModal, setCaseStudyModal] = useState({ isOpen: false, caseStudyId: null });
  const [serviceModal, setServiceModal] = useState({ isOpen: false, serviceId: null });
  const [formModal, setFormModal] = useState({ type: null, message: null });
  const [blogModal, setBlogModal] = useState({ isOpen: false, blogId: null });
  const [privacyTermsModal, setPrivacyTermsModal] = useState({ isOpen: false, type: null });
  const [projectRequestModal, setProjectRequestModal] = useState({ isOpen: false });

  const openPortfolioModal = useCallback((projectId) => {
    setPortfolioModal({ isOpen: true, projectId });
    document.body.style.overflow = 'hidden';
  }, []);

  const closePortfolioModal = useCallback(() => {
    setPortfolioModal({ isOpen: false, projectId: null });
    document.body.style.overflow = '';
  }, []);

  const openCaseStudyModal = useCallback((caseStudyId) => {
    setCaseStudyModal({ isOpen: true, caseStudyId });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeCaseStudyModal = useCallback(() => {
    setCaseStudyModal({ isOpen: false, caseStudyId: null });
    document.body.style.overflow = '';
  }, []);

  const openServiceModal = useCallback((serviceId) => {
    setServiceModal({ isOpen: true, serviceId });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeServiceModal = useCallback(() => {
    setServiceModal({ isOpen: false, serviceId: null });
    document.body.style.overflow = '';
  }, []);

  const showFormModal = useCallback((type, message) => {
    setFormModal({ type, message });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeFormModal = useCallback(() => {
    setFormModal({ type: null, message: null });
    document.body.style.overflow = '';
  }, []);

  const openBlogModal = useCallback((blogId) => {
    setBlogModal({ isOpen: true, blogId });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeBlogModal = useCallback(() => {
    setBlogModal({ isOpen: false, blogId: null });
    document.body.style.overflow = '';
  }, []);

  const openPrivacyTermsModal = useCallback((type) => {
    setPrivacyTermsModal({ isOpen: true, type });
    document.body.style.overflow = 'hidden';
  }, []);

  const closePrivacyTermsModal = useCallback(() => {
    setPrivacyTermsModal({ isOpen: false, type: null });
    document.body.style.overflow = '';
  }, []);

  const openProjectRequestModal = useCallback(() => {
    setProjectRequestModal({ isOpen: true });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProjectRequestModal = useCallback(() => {
    setProjectRequestModal({ isOpen: false });
    document.body.style.overflow = '';
  }, []);

  const value = useMemo(() => ({
    portfolioModal,
    openPortfolioModal,
    closePortfolioModal,
    caseStudyModal,
    openCaseStudyModal,
    closeCaseStudyModal,
    serviceModal,
    openServiceModal,
    closeServiceModal,
    formModal,
    showFormModal,
    closeFormModal,
    blogModal,
    openBlogModal,
    closeBlogModal,
    privacyTermsModal,
    openPrivacyTermsModal,
    closePrivacyTermsModal,
    projectRequestModal,
    openProjectRequestModal,
    closeProjectRequestModal
  }), [
    portfolioModal,
    caseStudyModal,
    serviceModal,
    formModal,
    blogModal,
    privacyTermsModal,
    projectRequestModal,
    openPortfolioModal,
    closePortfolioModal,
    openCaseStudyModal,
    closeCaseStudyModal,
    openServiceModal,
    closeServiceModal,
    showFormModal,
    closeFormModal,
    openBlogModal,
    closeBlogModal,
    openPrivacyTermsModal,
    closePrivacyTermsModal,
    openProjectRequestModal,
    closeProjectRequestModal
  ]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};





