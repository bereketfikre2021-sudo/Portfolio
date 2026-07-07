import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import './styles.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (import.meta.env.PROD) {
  root.render(<App />);
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
