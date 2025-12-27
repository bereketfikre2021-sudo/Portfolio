import React, { useEffect, useState } from 'react';

const ChristmasFloatingIcons = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    // Disable on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setIcons([]);
      return;
    }

    // Create array of floating icons
    const iconTypes = ['snowflake', 'star', 'ornament'];
    const newIcons = [];

    // Generate icons based on screen size - reduced for better performance
    const iconCount = window.innerWidth <= 1024 ? 8 : 12;

    for (let i = 0; i < iconCount; i++) {
      newIcons.push({
        id: i,
        type: iconTypes[Math.floor(Math.random() * iconTypes.length)],
        x: Math.random() * 100, // Percentage of viewport width
        y: Math.random() * 100, // Percentage of viewport height
        size: Math.random() * 20 + 16, // Size between 16-36px (larger for visibility)
        delay: Math.random() * 5, // Animation delay
        duration: Math.random() * 3 + 4, // Animation duration 4-7s
        opacity: Math.random() * 0.3 + 0.6, // Opacity between 0.6-0.9 (more visible)
      });
    }

    setIcons(newIcons);
  }, []);

  // Snowflake SVG
  const SnowflakeIcon = ({ size, opacity }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity }}
      className="christmas-icon snowflake"
    >
      <path
        d="M12 2v20M12 2l-2 2M12 2l2 2M12 22l-2-2M12 22l2-2M2 12h20M2 12l2-2M2 12l2 2M22 12l-2-2M22 12l-2 2M6.34 6.34l11.32 11.32M6.34 17.66l11.32-11.32M17.66 6.34L6.34 17.66M17.66 17.66L6.34 6.34"
        stroke="#E7F2EF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  // Star SVG
  const StarIcon = ({ size, opacity }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity }}
      className="christmas-icon star"
    >
      <path
        d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 16.8l-6.4 4.4 2.4-7.2-6-4.8h7.6L12 2z"
        stroke="#E7F2EF"
        strokeWidth="2"
        fill="#E7F2EF"
        fillOpacity="0.3"
      />
    </svg>
  );

  // Ornament SVG (subtle circle with decorative top)
  const OrnamentIcon = ({ size, opacity }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity }}
      className="christmas-icon ornament"
    >
      <circle
        cx="12"
        cy="14"
        r="6"
        stroke="#E7F2EF"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 2v4M10 4h4"
        stroke="#E7F2EF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14" r="2" fill="#E7F2EF" fillOpacity="0.5" />
    </svg>
  );

  const renderIcon = (icon) => {
    const style = {
      position: 'absolute',
      left: `${icon.x}%`,
      top: `${icon.y}%`,
      animationDelay: `${icon.delay}s`,
      animationDuration: `${icon.duration}s`,
    };

    switch (icon.type) {
      case 'snowflake':
        return (
          <div key={icon.id} style={style} className="christmas-icon-wrapper">
            <SnowflakeIcon size={icon.size} opacity={icon.opacity} />
          </div>
        );
      case 'star':
        return (
          <div key={icon.id} style={style} className="christmas-icon-wrapper">
            <StarIcon size={icon.size} opacity={icon.opacity} />
          </div>
        );
      case 'ornament':
        return (
          <div key={icon.id} style={style} className="christmas-icon-wrapper">
            <OrnamentIcon size={icon.size} opacity={icon.opacity} />
          </div>
        );
      default:
        return null;
    }
  };

  if (icons.length === 0) {
    return null;
  }

  return (
    <div className="christmas-floating-icons" aria-hidden="true">
      {icons.map(renderIcon)}
    </div>
  );
};

export default ChristmasFloatingIcons;
