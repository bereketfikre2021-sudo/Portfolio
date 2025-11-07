import React from "react";

const CountUpNumber = ({ target }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const elementId = React.useMemo(() => `count-up-trigger-${target}-${Math.random().toString(36).substr(2, 9)}`, [target]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(elementId);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible, elementId]);

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
      id={elementId}
      className="font-bold text-accent leading-none"
      style={{ 
        fontSize: '300px',
        lineHeight: '1',
        display: 'block'
      }}
    >
      {count}+
    </div>
  );
};

export default CountUpNumber;

