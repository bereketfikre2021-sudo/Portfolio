import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    
    // In production, you could log to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // In production: show hero-style fallback so link previews/screenshots show correct image
      if (process.env.NODE_ENV === 'production') {
        const imgSrc = `${process.env.PUBLIC_URL || ''}/assets/Bereket-Fikre-1.webp`;
        return (
          <section className="hero" id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="hero-content" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
              <div className="hero-left">
                <h1 className="hero-title">Bereket Fikre</h1>
                <p className="hero-tagline">Graphic and brand designer, visual story teller.</p>
                <button onClick={this.handleReload} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Reload Page
                </button>
              </div>
              <div className="hero-right">
                <div className="hero-image-container">
                  <img src={imgSrc} alt="Bereket Fikre" className="hero-image" width="800" height="1000" />
                </div>
              </div>
            </div>
          </section>
        );
      }
      // In development: show full error details
      return (
        <div className="error-boundary" role="alert" aria-live="assertive">
          <div className="error-boundary-content">
            <h1>Something went wrong</h1>
            <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
            <button onClick={this.handleReload} className="btn btn-primary" aria-label="Reload page to fix error">
              Reload Page
            </button>
            {this.state.error && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo && <pre>{this.state.errorInfo.componentStack}</pre>}
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

