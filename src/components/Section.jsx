const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`np ${className}`}>{children}</section>
);

export default Section;



