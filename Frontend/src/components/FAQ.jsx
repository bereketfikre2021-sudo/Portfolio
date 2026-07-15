import React, { useState, useEffect, useRef } from 'react';
import { faqItems as FALLBACK_FAQS } from '../data/faqContent';
import apiFetch from '../utils/api';

const FAQ = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const userInteractedRef = useRef(false);
  const [direction, setDirection] = useState('next');
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);

  // Fetch FAQs from backend — fall back to hardcoded data if fetch fails
  useEffect(() => {
    apiFetch('/faqs?limit=50&isActive=true')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data.map((f) => ({ question: f.question, answer: f.answer })));
        }
      })
      .catch(() => {
        // API unavailable — silently keep the hardcoded fallback
      });
  }, []);

  // FAQPage JSON-LD for search rich results (injected client-side for single source of truth with faqs)
  useEffect(() => {
    const id = 'jsonld-faq-page';
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(payload);
  }, [faqs]);

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
  }, [isAutoPlaying, faqs.length]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (mq.matches) setIsAutoPlaying(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-number desktop-number">07</span>
          <span className="section-number mobile-number">07</span>
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
                        {/<[a-z][\s\S]*>/i.test(faq.answer)
                          ? <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                          : <p>{faq.answer}</p>
                        }
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





