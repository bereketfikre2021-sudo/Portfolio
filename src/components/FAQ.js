import React, { useState, useEffect, useRef } from 'react';

const FAQ = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const userInteractedRef = useRef(false);
  const [direction, setDirection] = useState('next');

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

  const goToSlide = (index) => {
    if (index < 0) {
      setCurrentSlide(faqs.length - 1);
      setDirection('prev');
    } else if (index >= faqs.length) {
      setCurrentSlide(0);
      setDirection('next');
    } else {
      const newIndex = index;
      if (newIndex > currentSlide) {
        setDirection('next');
      } else if (newIndex < currentSlide) {
        setDirection('prev');
      }
      setCurrentSlide(newIndex);
    }
  };

  // Auto-slide animation for FAQ questions
  useEffect(() => {
    if (!isAutoPlaying || userInteractedRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    // Set up interval for auto-sliding
    intervalRef.current = setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev + 1) % faqs.length);
    }, 5000); // Change FAQ every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlaying, faqs.length, currentSlide]);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-number desktop-number">09</span>
          <span className="section-number mobile-number">06</span>
          <div className="section-header">
            <span className="section-label">Common Questions</span>
            <h2 id="faq-heading" className="section-title">
              <span className="title-main">Frequently Asked</span>
              <span className="title-accent">Questions</span>
            </h2>
          </div>
        </div>
        
        <div className="faq-wrapper" role="region" aria-roledescription="carousel" aria-label="Frequently asked questions">
          <div className="faq-carousel-container">
            <div 
              className="faq-carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="faq-carousel-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Question ${index + 1} of ${faqs.length}`}
                  aria-hidden={index !== currentSlide}
                >
                  <div className="faq-item active">
                    <div className="faq-question active">
                      <span className="faq-question-text">{faq.question}</span>
                    </div>
                    <div className="faq-answer" aria-live="polite">
                      <div className="faq-answer-content">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="faq-carousel-dots" role="group" aria-label="Question navigation">
              {faqs.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`faq-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => {
                    userInteractedRef.current = true;
                    setIsAutoPlaying(false);
                    goToSlide(index);
                  }}
                  aria-label={`Go to question ${index + 1}: ${faqs[index].question}`}
                  aria-current={index === currentSlide ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;





