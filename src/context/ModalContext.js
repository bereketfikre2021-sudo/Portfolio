import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [portfolioModal, setPortfolioModal] = useState({ isOpen: false, projectId: null });
  const [serviceModal, setServiceModal] = useState({ isOpen: false, serviceId: null });
  const [formModal, setFormModal] = useState({ type: null, message: null });
  const [caseStudyModal, setCaseStudyModal] = useState({ isOpen: false, caseStudyId: null });
  const [blogModal, setBlogModal] = useState({ isOpen: false, blogId: null });

  const openPortfolioModal = (projectId) => {
    setPortfolioModal({ isOpen: true, projectId });
    document.body.style.overflow = 'hidden';
  };

  const closePortfolioModal = () => {
    setPortfolioModal({ isOpen: false, projectId: null });
    document.body.style.overflow = '';
  };

  const openServiceModal = (serviceId) => {
    setServiceModal({ isOpen: true, serviceId });
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    setServiceModal({ isOpen: false, serviceId: null });
    document.body.style.overflow = '';
  };

  const showFormModal = (type, message) => {
    setFormModal({ type, message });
    document.body.style.overflow = 'hidden';
  };

  const closeFormModal = () => {
    setFormModal({ type: null, message: null });
    document.body.style.overflow = '';
  };

  const openCaseStudyModal = (caseStudyId) => {
    setCaseStudyModal({ isOpen: true, caseStudyId });
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudyModal = () => {
    setCaseStudyModal({ isOpen: false, caseStudyId: null });
    document.body.style.overflow = '';
  };

  const openBlogModal = (blogId) => {
    setBlogModal({ isOpen: true, blogId });
    document.body.style.overflow = 'hidden';
  };

  const closeBlogModal = () => {
    setBlogModal({ isOpen: false, blogId: null });
    document.body.style.overflow = '';
  };

  return (
    <ModalContext.Provider
      value={{
        portfolioModal,
        openPortfolioModal,
        closePortfolioModal,
        serviceModal,
        openServiceModal,
        closeServiceModal,
        formModal,
        showFormModal,
        closeFormModal,
        caseStudyModal,
        openCaseStudyModal,
        closeCaseStudyModal,
        blogModal,
        openBlogModal,
        closeBlogModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};





