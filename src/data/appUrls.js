// App URLs — imported by Navigation (static) and FitnessAppButton (lazy)
// Keeping them in a separate file prevents the lazy chunk from being pulled into the main bundle

export const FITNESS_APP_URL  = 'https://fit-trackpro.bereketfikre.et/';
export const DATING_APP_URL   = 'https://date.bereketfikre.et/';

export const FITNESS_APP_LOGO = encodeURI(
  `${typeof process !== 'undefined' && process.env?.PUBLIC_URL ? process.env.PUBLIC_URL : ''}/assets/fitness track pro.png?v=2`
);
