import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import logger from '../utils/logger';

/**
 * Get theme from document or system preference
 */
const getTheme = () => {
  // Check if document has a theme class
  if (document.documentElement.classList.contains('light')) {
    return 'light';
  }
  if (document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  // Check localStorage
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  // Default to dark
  return 'dark';
};

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0,
      theme: getTheme()
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    try {
      logger.error('ErrorBoundary caught an error:', {
        error: error.toString(),
        errorInfo: errorInfo.componentStack,
        errorStack: error.stack,
      });
    } catch (e) {
      // Fallback if logger fails
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
      errorCount: this.state.errorCount + 1,
      theme: getTheme(),
    });

    // Report to error tracking service if available
    if (window.gtag) {
      try {
        window.gtag('event', 'exception', {
          description: error.toString(),
          fatal: false,
        });
      } catch (e) {
        // Silently fail if gtag fails
      }
    }
  }

  componentDidMount() {
    // Listen for theme changes
    this.themeObserver = new MutationObserver(() => {
      this.setState({ theme: getTheme() });
    });
    
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Listen for system theme changes
    if (window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      this.mediaQuery.addEventListener('change', () => {
        this.setState({ theme: getTheme() });
      });
    }
  }

  componentWillUnmount() {
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', () => {});
    }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { fallback, showDetails = false } = this.props;
      const resolvedTheme = this.state.theme;

      // Use custom fallback if provided
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback(this.state.error, this.handleReset)
          : fallback;
      }

      // Default error UI
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
          onReload={this.handleReload}
          onGoHome={this.handleGoHome}
          showDetails={showDetails}
          theme={resolvedTheme}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Error Fallback UI Component
 */
const ErrorFallback = ({ 
  error, 
  errorInfo, 
  onReset, 
  onReload, 
  onGoHome,
  showDetails = false,
  theme = 'dark'
}) => {
  const isLight = theme === 'light';

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: isLight ? '#E7F2EF' : '#19183B',
      }}
    >
      <div 
        className="max-w-2xl w-full rounded-lg p-8 space-y-6"
        style={{
          background: isLight ? '#19183B' : '#E7F2EF',
          border: '1px solid rgba(138,234,146,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        {/* Error Icon */}
        <div className="flex justify-center">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(138,234,146,0.1)',
            }}
          >
            <AlertCircle 
              className="w-8 h-8"
              style={{ color: '#8AEA92' }}
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center space-y-3">
          <h2 
            className="text-2xl font-bold"
            style={{
              color: isLight ? '#19183B' : '#E7F2EF',
            }}
          >
            Something went wrong
          </h2>
          <p 
            className="text-base"
            style={{
              color: isLight ? '#19183B' : '#A1C2BD',
              opacity: 0.8,
            }}
          >
            We're sorry, but something unexpected happened. Please try again or contact support if the problem persists.
          </p>
        </div>

        {/* Error Details (if showDetails is true) */}
        {showDetails && error && (
          <details 
            className="mt-4 p-4 rounded-lg"
            style={{
              background: isLight ? 'rgba(138,234,146,0.05)' : 'rgba(138,234,146,0.1)',
              border: '1px solid rgba(138,234,146,0.2)',
            }}
          >
            <summary 
              className="cursor-pointer font-semibold mb-2"
              style={{
                color: isLight ? '#19183B' : '#E7F2EF',
              }}
            >
              Error Details
            </summary>
            <pre 
              className="text-xs overflow-auto mt-2"
              style={{
                color: isLight ? '#19183B' : '#A1C2BD',
                fontFamily: 'monospace',
              }}
            >
              {error.toString()}
              {errorInfo && `\n\n${errorInfo.componentStack}`}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: '#8AEA92',
              color: '#000000',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <button
            onClick={onReload}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: 'transparent',
              color: isLight ? '#19183B' : '#E7F2EF',
              border: '1px solid rgba(138,234,146,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138,234,146,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>
          
          <button
            onClick={onGoHome}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: 'transparent',
              color: isLight ? '#19183B' : '#E7F2EF',
              border: '1px solid rgba(138,234,146,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(138,234,146,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * HOC to wrap components with ErrorBoundary
 */
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  const WrappedComponent = (props) => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

export default ErrorBoundary;
