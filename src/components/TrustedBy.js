import React, { useEffect } from 'react';

const TrustedBy = () => {
  // Ensure TrustedBy section is visible on mobile when AOS is disabled
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Force visibility on mobile
      const trustedBySection = document.getElementById('trusted-by');
      if (trustedBySection) {
        const aosElements = trustedBySection.querySelectorAll('[data-aos]');
        aosElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          el.style.pointerEvents = 'auto';
        });
        
        // Also ensure section-intro is visible
        const sectionIntro = trustedBySection.querySelector('.section-intro');
        if (sectionIntro) {
          sectionIntro.style.opacity = '1';
          sectionIntro.style.visibility = 'visible';
          sectionIntro.style.display = 'flex';
        }
      }
    }
  }, []);
  const companies = [
    { name: 'Andegna', logo: '/assets/Trusted By/Andegna-Logo-Outline-7565946d.webp', url: 'https://andegnafurniture.com/' },
    { name: 'Gedylaw', logo: '/assets/Trusted By/Gedylaw-53a5feb2.webp', url: 'https://gedy-law.com/welcome' },
    { name: 'Medavail', logo: '/assets/Trusted By/Medavail-logo-e49b9b88.webp', url: null },
    { name: 'Niqat', logo: '/assets/Trusted By/Niqat-be4b5d56.webp', url: 'https://linktr.ee/Niqatcoffee' },
    { name: 'PDC', logo: '/assets/Trusted By/PDC-Logo-2483595d.webp', url: 'https://pdc-et.com/' },
    { name: 'Prime All', logo: '/assets/Trusted By/Prime-All-3a38c568.webp', url: 'https://primesoftwaresolution.net/' }
  ];

  // Duplicate for seamless loop
  const allCompanies = [...companies, ...companies, ...companies, ...companies];

  return (
    <section id="trusted-by" className="trusted-by" aria-labelledby="trusted-by-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-number desktop-number">07</span>
          <div className="section-header">
            <span className="section-label">Our Partners</span>
            <h2 className="section-title">
              <span className="title-main">Trusted</span>
              <span className="title-accent">By</span>
            </h2>
          </div>
        </div>
        
        <div className="trusted-by-grid">
          <div className="trusted-by-track">
            {allCompanies.map((company, idx) => {
              const content = (
                <>
                  <div className="trusted-card-inner">
                    <div className="trusted-logo-wrapper">
                      <img 
                        src={`${process.env.PUBLIC_URL || ''}${company.logo}`} 
                        alt={`${company.name} company logo - Trusted partner of Bereket Fikre`} 
                        className="trusted-logo" 
                        loading="lazy" 
                        width="150" 
                        height="80"
                        decoding="async"
                        sizes="150px"
                      />
                    </div>
                  </div>
                  <span className="trusted-company-name">{company.name}</span>
                </>
              );

              return (
                <div key={idx} className="trusted-by-card">
                  {company.url ? (
                    <a href={company.url} target="_blank" rel="noopener noreferrer" className="trusted-card-link">
                      {content}
                    </a>
                  ) : (
                    <div className="trusted-card-link">
                      {content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;


