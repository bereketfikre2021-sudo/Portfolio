import React from "react";

const CountUpNumber = ({ target }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('count-up-trigger');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible]);

  React.useEffect(() => {
    if (isVisible) {
      const duration = 800; // 0.8 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, target]);

  return (
    <div 
      id="count-up-trigger" 
      className="font-bold text-accent leading-none"
      style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}
    >
      {count}+
    </div>
  );
};

export default CountUpNumber;

