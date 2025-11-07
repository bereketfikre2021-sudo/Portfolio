// Advanced security management system
import logger from './logger.js';

class SecurityManager {
  constructor() {
    this.securityPolicies = {
      csp: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
        'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        'font-src': ["'self'", "https://fonts.gstatic.com"],
        'img-src': ["'self'", "data:", "https:"],
        'connect-src': ["'self'", "https://www.google-analytics.com", "https://www.googletagmanager.com"],
        'frame-src': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'", "https://formspree.io"]
      },
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      permissionsPolicy: {
        'camera': [],
        'microphone': [],
        'geolocation': [],
        'payment': [],
        'usb': [],
        'magnetometer': [],
        'gyroscope': [],
        'accelerometer': []
      }
    };
    this.threats = [];
    this.isMonitoring = false;
  }

  // Initialize security features
  init() {
    this.setupCSP();
    this.setupSecurityHeaders();
    this.setupThreatDetection();
    this.setupDataProtection();
    this.startSecurityMonitoring();
    logger.log('Security manager initialized');
  }

  // Setup Content Security Policy
  setupCSP() {
    const csp = this.securityPolicies.csp;
    const cspString = Object.entries(csp)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');

    // Create meta tag for CSP
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = cspString;
    document.head.appendChild(meta);

    // Report CSP violations
    document.addEventListener('securitypolicyviolation', (e) => {
      this.handleCSPViolation(e);
    });

    logger.log('Content Security Policy applied');
  }

  // Handle CSP violations
  handleCSPViolation(event) {
    const violation = {
      type: 'csp_violation',
      timestamp: new Date().toISOString(),
      blockedURI: event.blockedURI,
      violatedDirective: event.violatedDirective,
      originalPolicy: event.originalPolicy,
      sourceFile: event.sourceFile,
      lineNumber: event.lineNumber,
      columnNumber: event.columnNumber
    };

    this.recordThreat(violation);
    logger.warn('CSP Violation detected:', violation);
  }

  // Setup security headers
  setupSecurityHeaders() {
    // Note: In a real application, these would be set by the server
    // This is a demonstration of what headers should be set
    const headers = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': this.securityPolicies.referrerPolicy,
      'Permissions-Policy': this.generatePermissionsPolicy()
    };

    logger.log('Security headers configured:', headers);
  }

  // Generate Permissions Policy
  generatePermissionsPolicy() {
    const policy = Object.entries(this.securityPolicies.permissionsPolicy)
      .map(([feature, allowlist]) => `${feature}=(${allowlist.join(' ')})`)
      .join(', ');
    return policy;
  }

  // Setup threat detection
  setupThreatDetection() {
    // Monitor for suspicious activities
    this.setupClickjackingProtection();
    this.setupXSSProtection();
    this.setupCSRFProtection();
    this.setupDataExfiltrationProtection();
  }

  // Clickjacking protection
  setupClickjackingProtection() {
    // Check if page is being framed
    if (window.top !== window.self) {
      this.recordThreat({
        type: 'clickjacking_attempt',
        timestamp: new Date().toISOString(),
        message: 'Page is being framed by external domain'
      });
    }

    // Monitor for unexpected iframe interactions
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'IFRAME' && !target.src.startsWith(window.location.origin)) {
        this.recordThreat({
          type: 'suspicious_iframe_click',
          timestamp: new Date().toISOString(),
          iframeSrc: target.src
        });
      }
    });
  }

  // XSS protection
  setupXSSProtection() {
    // Monitor for script injection attempts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check for suspicious script tags
            if (node.tagName === 'SCRIPT' && node.src && !this.isAllowedScript(node.src)) {
              this.recordThreat({
                type: 'xss_attempt',
                timestamp: new Date().toISOString(),
                scriptSrc: node.src,
                message: 'Suspicious script tag detected'
              });
            }

            // Check for inline event handlers
            if (node.attributes) {
              Array.from(node.attributes).forEach(attr => {
                if (attr.name.startsWith('on') && attr.value.includes('javascript:')) {
                  this.recordThreat({
                    type: 'xss_attempt',
                    timestamp: new Date().toISOString(),
                    attribute: attr.name,
                    value: attr.value,
                    message: 'Suspicious inline event handler detected'
                  });
                }
              });
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['onclick', 'onload', 'onerror', 'onmouseover']
    });
  }

  // Check if script is allowed
  isAllowedScript(src) {
    const allowedDomains = [
      window.location.origin,
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://fonts.googleapis.com'
    ];

    return allowedDomains.some(domain => src.startsWith(domain));
  }

  // CSRF protection
  setupCSRFProtection() {
    // Generate CSRF token
    const csrfToken = this.generateCSRFToken();
    sessionStorage.setItem('csrf_token', csrfToken);

    // Add token to all forms
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.tagName === 'FORM') {
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'csrf_token';
        tokenInput.value = csrfToken;
        form.appendChild(tokenInput);
      }
    });

    // Validate token on form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.tagName === 'FORM') {
        const token = form.querySelector('input[name="csrf_token"]')?.value;
        const storedToken = sessionStorage.getItem('csrf_token');
        
        if (!token || token !== storedToken) {
          e.preventDefault();
          this.recordThreat({
            type: 'csrf_attempt',
            timestamp: new Date().toISOString(),
            message: 'Invalid CSRF token'
          });
        }
      }
    });
  }

  // Generate CSRF token
  generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Data exfiltration protection
  setupDataExfiltrationProtection() {
    // Monitor for suspicious network requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const url = args[0];
      
      // Check if request is to suspicious domains
      if (typeof url === 'string' && this.isSuspiciousDomain(url)) {
        this.recordThreat({
          type: 'data_exfiltration_attempt',
          timestamp: new Date().toISOString(),
          url: url,
          message: 'Request to suspicious domain detected'
        });
      }

      return originalFetch.apply(this, args);
    };

    // Monitor for suspicious data access
    this.setupDataAccessMonitoring();
  }

  // Check if domain is suspicious
  isSuspiciousDomain(url) {
    const suspiciousPatterns = [
      /\.tk$/,
      /\.ml$/,
      /\.ga$/,
      /\.cf$/,
      /bit\.ly/,
      /tinyurl/,
      /goo\.gl/
    ];

    try {
      const domain = new URL(url).hostname;
      return suspiciousPatterns.some(pattern => pattern.test(domain));
    } catch {
      return false;
    }
  }

  // Setup data access monitoring
  setupDataAccessMonitoring() {
    // Monitor localStorage access
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      if (key.includes('password') || key.includes('token') || key.includes('secret')) {
        securityManager.recordThreat({
          type: 'sensitive_data_storage',
          timestamp: new Date().toISOString(),
          key: key,
          message: 'Sensitive data stored in localStorage'
        });
      }
      return originalSetItem.call(this, key, value);
    };

    // Monitor sessionStorage access
    const originalSessionSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function(key, value) {
      if (key.includes('password') || key.includes('token') || key.includes('secret')) {
        securityManager.recordThreat({
          type: 'sensitive_data_storage',
          timestamp: new Date().toISOString(),
          key: key,
          message: 'Sensitive data stored in sessionStorage'
        });
      }
      return originalSessionSetItem.call(this, key, value);
    };
  }

  // Setup data protection
  setupDataProtection() {
    this.setupDataEncryption();
    this.setupDataAnonymization();
    this.setupPrivacyControls();
  }

  // Setup data encryption
  setupDataEncryption() {
    // Simple encryption for sensitive data
    this.encryptionKey = this.generateEncryptionKey();
  }

  // Generate encryption key
  generateEncryptionKey() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Encrypt data
  encryptData(data) {
    // Simple XOR encryption (in production, use proper encryption)
    const key = this.encryptionKey;
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted);
  }

  // Decrypt data
  decryptData(encryptedData) {
    const key = this.encryptionKey;
    const data = atob(encryptedData);
    let decrypted = '';
    for (let i = 0; i < data.length; i++) {
      decrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decrypted;
  }

  // Setup data anonymization
  setupDataAnonymization() {
    // Anonymize user data before sending to analytics
    this.originalGtag = window.gtag;
    if (this.originalGtag) {
      window.gtag = (...args) => {
        // Anonymize IP and user data
        const anonymizedArgs = args.map(arg => {
          if (typeof arg === 'object' && arg !== null) {
            return {
              ...arg,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            };
          }
          return arg;
        });
        return this.originalGtag.apply(this, anonymizedArgs);
      };
    }
  }

  // Setup privacy controls
  setupPrivacyControls() {
    // Add privacy controls to the page
    this.createPrivacyControls();
  }

  // Create privacy controls
  createPrivacyControls() {
    const controls = document.createElement('div');
    controls.id = 'privacy-controls';
    controls.className = 'fixed bottom-4 left-4 z-50 hidden';
    controls.innerHTML = `
      <div class="bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-lg p-4 shadow-lg">
        <h3 class="text-sm font-semibold text-light mb-2">Privacy Controls</h3>
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-xs text-accent">
            <input type="checkbox" id="analytics-consent" checked>
            Analytics
          </label>
          <label class="flex items-center gap-2 text-xs text-accent">
            <input type="checkbox" id="marketing-consent">
            Marketing
          </label>
          <button id="clear-data" class="text-xs text-red-400 hover:text-red-300">
            Clear All Data
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(controls);

    // Add event listeners
    document.getElementById('analytics-consent')?.addEventListener('change', (e) => {
      this.handleAnalyticsConsent(e.target.checked);
    });

    document.getElementById('marketing-consent')?.addEventListener('change', (e) => {
      this.handleMarketingConsent(e.target.checked);
    });

    document.getElementById('clear-data')?.addEventListener('click', () => {
      this.clearAllData();
    });
  }

  // Handle analytics consent
  handleAnalyticsConsent(consent) {
    localStorage.setItem('analytics_consent', consent.toString());
    if (!consent) {
      // Disable analytics
      window.gtag = () => {};
    }
  }

  // Handle marketing consent
  handleMarketingConsent(consent) {
    localStorage.setItem('marketing_consent', consent.toString());
  }

  // Clear all data
  clearAllData() {
    localStorage.clear();
    sessionStorage.clear();
    // Clear cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    
    this.recordThreat({
      type: 'data_cleared',
      timestamp: new Date().toISOString(),
      message: 'User requested data clearing'
    });
  }

  // Start security monitoring
  startSecurityMonitoring() {
    this.isMonitoring = true;
    
    // Monitor for security events every 30 seconds
    this.monitoringInterval = setInterval(() => {
      this.performSecurityCheck();
    }, 30000);

    // Monitor for threats
    this.threatMonitoringInterval = setInterval(() => {
      this.analyzeThreats();
    }, 60000);
  }

  // Stop security monitoring
  stopSecurityMonitoring() {
    this.isMonitoring = false;
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    
    if (this.threatMonitoringInterval) {
      clearInterval(this.threatMonitoringInterval);
    }
  }

  // Perform security check
  performSecurityCheck() {
    const checks = {
      https: window.location.protocol === 'https:',
      csp: document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null,
      hsts: this.checkHSTS(),
      secureCookies: this.checkSecureCookies(),
      mixedContent: this.checkMixedContent()
    };

    const issues = Object.entries(checks)
      .filter(([_, passed]) => !passed)
      .map(([check, _]) => check);

    if (issues.length > 0) {
      this.recordThreat({
        type: 'security_check_failed',
        timestamp: new Date().toISOString(),
        issues: issues,
        message: 'Security checks failed'
      });
    }
  }

  // Check HSTS
  checkHSTS() {
    // In a real application, this would check the HSTS header
    return window.location.protocol === 'https:';
  }

  // Check secure cookies
  checkSecureCookies() {
    const cookies = document.cookie.split(';');
    return cookies.every(cookie => {
      const trimmed = cookie.trim();
      return !trimmed.includes('=') || trimmed.includes('Secure') || trimmed.includes('HttpOnly');
    });
  }

  // Check for mixed content
  checkMixedContent() {
    const images = document.querySelectorAll('img[src^="http:"]');
    const scripts = document.querySelectorAll('script[src^="http:"]');
    const links = document.querySelectorAll('link[href^="http:"]');
    
    return images.length === 0 && scripts.length === 0 && links.length === 0;
  }

  // Record threat
  recordThreat(threat) {
    this.threats.push(threat);
    
    // Keep only last 100 threats
    if (this.threats.length > 100) {
      this.threats = this.threats.slice(-100);
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('security_threats', JSON.stringify(this.threats));
    } catch (error) {
      logger.warn('Failed to store security threats:', error);
    }

    // Send to security monitoring service (if available)
    this.reportThreat(threat);
  }

  // Report threat
  reportThreat(threat) {
    // In a real application, this would send to a security monitoring service
    logger.warn('Security threat detected:', threat);
  }

  // Analyze threats
  analyzeThreats() {
    const recentThreats = this.threats.filter(
      threat => Date.now() - new Date(threat.timestamp).getTime() < 300000 // Last 5 minutes
    );

    if (recentThreats.length > 10) {
      this.recordThreat({
        type: 'high_threat_volume',
        timestamp: new Date().toISOString(),
        threatCount: recentThreats.length,
        message: 'High volume of security threats detected'
      });
    }
  }

  // Get security report
  getSecurityReport() {
    return {
      threats: this.threats,
      threatCount: this.threats.length,
      recentThreats: this.threats.filter(
        threat => Date.now() - new Date(threat.timestamp).getTime() < 3600000 // Last hour
      ),
      securityPolicies: this.securityPolicies,
      isMonitoring: this.isMonitoring
    };
  }

  // Get threat statistics
  getThreatStatistics() {
    const stats = {
      total: this.threats.length,
      byType: {},
      byHour: {},
      recent: 0
    };

    this.threats.forEach(threat => {
      // Count by type
      stats.byType[threat.type] = (stats.byType[threat.type] || 0) + 1;
      
      // Count by hour
      const hour = new Date(threat.timestamp).getHours();
      stats.byHour[hour] = (stats.byHour[hour] || 0) + 1;
      
      // Count recent threats (last 24 hours)
      if (Date.now() - new Date(threat.timestamp).getTime() < 86400000) {
        stats.recent++;
      }
    });

    return stats;
  }
}

// Create global instance
const securityManager = new SecurityManager();

// Auto-initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    securityManager.init();
  });
}

export default securityManager;
export { SecurityManager };

export { SecurityManager };
