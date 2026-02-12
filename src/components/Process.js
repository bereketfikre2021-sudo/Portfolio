import React from 'react';

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Understanding your brand, goals, and audience so we start from a clear brief.',
      icon: (
        <svg className="process-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      )
    },
    {
      number: '02',
      title: 'Concept',
      description: 'Ideation and direction—mood boards, concepts, and a shared vision before design.',
      icon: (
        <svg className="process-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
        </svg>
      )
    },
    {
      number: '03',
      title: 'Design',
      description: 'Crafting visuals, iterations, and feedback rounds until everything feels right.',
      icon: (
        <svg className="process-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      )
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'Final files, guidelines, and handoff so you can use your new identity with confidence.',
      icon: (
        <svg className="process-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    }
  ];

  return (
    <section id="process" className="process" aria-labelledby="process-heading">
      <div className="container">
        <div className="section-intro" data-aos="fade-up">
          <span className="section-number desktop-number">03</span>
          <span className="section-number mobile-number">03</span>
          <div className="section-header">
            <span className="section-label">How I Work</span>
            <h2 id="process-heading" className="section-title">
              <span className="title-main">From Brief to</span>
              <span className="title-accent">Delivery</span>
            </h2>
          </div>
        </div>

        <div className="process-steps" role="list">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="process-step"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              role="listitem"
            >
              <div className="process-step-inner">
                <div className="process-step-header">
                  <span className="process-step-number" aria-hidden="true">{step.number}</span>
                  <span className="process-step-icon-wrap">{step.icon}</span>
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="process-step-connector" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
