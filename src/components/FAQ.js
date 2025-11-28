import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'I offer comprehensive design services including brand identity design, UI/UX design, graphic design, web design, logo design, packaging design, and digital marketing materials. Each project is tailored to meet your specific business needs and goals.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A logo design typically takes 7-14 business days, brand identity packages take 14-21 business days, UI/UX projects take 21-30 business days, and web design projects take 14-28 business days. I\'ll provide a detailed timeline after understanding your project requirements.'
    },
    {
      question: 'What is your design process?',
      answer: 'My design process involves several key stages: discovery and research, concept development, design creation, client feedback and revisions, and final delivery. I believe in collaborative communication throughout the process to ensure the final design exceeds your expectations and aligns with your brand vision.'
    },
    {
      question: 'Do you work with clients remotely?',
      answer: 'Yes! I work with clients worldwide through remote collaboration. I use video calls, email, and project management tools to ensure seamless communication regardless of location. I\'m based in Addis Ababa, Ethiopia, but my services are accessible globally.'
    },
    {
      question: 'What file formats do you provide?',
      answer: 'I provide all necessary file formats for your project. This typically includes vector files (AI, EPS, SVG), raster files (PNG, JPG) in various sizes, PDF files for print, and source files in Adobe Creative Suite formats. I ensure you have everything needed for both digital and print applications.'
    },
    {
      question: 'How many revisions are included?',
      answer: 'I include 2-3 rounds of revisions in my standard packages to ensure the design meets your expectations. Additional revisions can be arranged if needed. My goal is to deliver a design you\'re completely satisfied with while maintaining project timelines.'
    },
    {
      question: 'Do you provide ongoing design support?',
      answer: 'Yes, I offer ongoing design support and maintenance services. After project completion, I can provide continued design services for social media graphics, marketing materials, and design updates. We can discuss a retainer or per-project arrangement based on your needs.'
    },
    {
      question: 'What information do you need to start a project?',
      answer: 'To start a project, I\'ll need details about your business, target audience, design preferences, project goals, and any existing brand guidelines. I\'ll send you a brief questionnaire to gather all necessary information, and we\'ll schedule a consultation call to discuss your vision in detail.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-intro">
          <span className="section-number">07</span>
          <div className="section-header">
            <span className="section-label">Common Questions</span>
            <h2 className="section-title">
              <span className="title-main">Frequently Asked</span>
              <span className="title-accent">Questions</span>
            </h2>
          </div>
        </div>
        
        <div className="faq-wrapper">
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                <button 
                  className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;





