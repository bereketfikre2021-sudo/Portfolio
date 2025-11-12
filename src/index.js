import React from 'react';
import ReactDOM from 'react-dom/client';
// CSS is loaded here - React Scripts will inject it into head
// For production, consider extracting critical CSS inline
import './styles.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Remove StrictMode in production for better performance
// StrictMode causes double renders in development which is intentional for catching issues
if (process.env.NODE_ENV === 'production') {
  root.render(<App />);
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}







