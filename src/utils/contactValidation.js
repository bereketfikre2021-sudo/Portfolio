// Advanced contact form validation utilities
import logger from './logger.js';

class ContactValidation {
  constructor() {
    this.validationRules = {
      firstName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'First name must be 2-50 characters and contain only letters'
      },
      lastName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'Last name must be 2-50 characters and contain only letters'
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      },
      phone: {
        required: false,
        pattern: /^[\+]?[1-9][\d]{0,15}$/,
        message: 'Please enter a valid phone number'
      },
      company: {
        required: false,
        maxLength: 100,
        message: 'Company name must be less than 100 characters'
      },
      subject: {
        required: false,
        maxLength: 200,
        message: 'Subject must be less than 200 characters'
      },
      message: {
        required: true,
        minLength: 10,
        maxLength: 1000,
        message: 'Message must be 10-1000 characters'
      }
    };

    this.fileValidation = {
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ],
      maxFiles: 5
    };
  }

  // Validate a single field
  validateField(fieldName, value) {
    const rule = this.validationRules[fieldName];
    if (!rule) return { valid: true };

    const errors = [];

    // Required validation
    if (rule.required && (!value || value.trim() === '')) {
      errors.push(`${this.capitalizeFirst(fieldName)} is required`);
      return { valid: false, errors };
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      return { valid: true };
    }

    // Length validations
    if (rule.minLength && value.length < rule.minLength) {
      errors.push(`${this.capitalizeFirst(fieldName)} must be at least ${rule.minLength} characters`);
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push(`${this.capitalizeFirst(fieldName)} must be less than ${rule.maxLength} characters`);
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.message);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Validate entire form
  validateForm(formData) {
    const errors = {};
    const isValid = true;

    Object.keys(this.validationRules).forEach(fieldName => {
      const validation = this.validateField(fieldName, formData[fieldName]);
      if (!validation.valid) {
        errors[fieldName] = validation.errors[0]; // Take first error
      }
    });

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Validate files
  validateFiles(files) {
    const errors = [];
    const validFiles = [];

    if (files.length > this.fileValidation.maxFiles) {
      errors.push(`Maximum ${this.fileValidation.maxFiles} files allowed`);
      return { valid: false, errors, validFiles: [] };
    }

    files.forEach((file, index) => {
      const fileErrors = [];

      // Size validation
      if (file.size > this.fileValidation.maxSize) {
        fileErrors.push(`File ${file.name} is too large (max ${this.formatFileSize(this.fileValidation.maxSize)})`);
      }

      // Type validation
      if (!this.fileValidation.allowedTypes.includes(file.type)) {
        fileErrors.push(`File type ${file.type} is not supported`);
      }

      // Name validation
      if (file.name.length > 255) {
        fileErrors.push(`File name ${file.name} is too long`);
      }

      if (fileErrors.length === 0) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${fileErrors.join(', ')}`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      validFiles
    };
  }

  // Real-time validation with debouncing
  createRealTimeValidator(callback, delay = 500) {
    let timeoutId;

    return (fieldName, value) => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const validation = this.validateField(fieldName, value);
        callback(fieldName, validation);
      }, delay);
    };
  }

  // Email domain validation
  async validateEmailDomain(email) {
    try {
      const emailValidationApiKey = import.meta.env.VITE_EMAIL_VALIDATION_API_KEY;
      const emailValidationEndpoint = import.meta.env.VITE_EMAIL_VALIDATION_ENDPOINT || 'https://api.email-validator.net/api/verify';
      
      if (!emailValidationApiKey) {
        // Skip email validation if API key is not configured
        return { valid: true };
      }
      
      const domain = email.split('@')[1];
      const response = await fetch(`${emailValidationEndpoint}?Email=${email}&APIKey=${emailValidationApiKey}`);
      const data = await response.json();
      
      return {
        valid: data.status === 'Valid',
        message: data.status === 'Valid' ? 'Email domain is valid' : 'Email domain appears to be invalid'
      };
    } catch (error) {
      logger.warn('Email domain validation failed:', error);
      return { valid: true, message: 'Could not validate email domain' };
    }
  }

  // Phone number formatting and validation
  formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return phoneNumber;
  }

  // Validate phone number with country code
  validatePhoneNumber(phoneNumber, countryCode = 'US') {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    const patterns = {
      US: /^1?[2-9]\d{2}[2-9]\d{2}\d{4}$/,
      UK: /^(\+44|0)[1-9]\d{8,9}$/,
      CA: /^1?[2-9]\d{2}[2-9]\d{2}\d{4}$/,
      AU: /^(\+61|0)[2-9]\d{8}$/
    };

    const pattern = patterns[countryCode] || patterns.US;
    return {
      valid: pattern.test(cleaned),
      message: pattern.test(cleaned) ? 'Phone number is valid' : 'Please enter a valid phone number'
    };
  }

  // Spam detection
  detectSpam(message) {
    const spamKeywords = [
      'viagra', 'casino', 'lottery', 'winner', 'congratulations',
      'click here', 'free money', 'urgent', 'act now', 'limited time'
    ];

    const suspiciousPatterns = [
      /https?:\/\/[^\s]+/g, // URLs
      /[A-Z]{5,}/g, // Excessive caps
      /!{3,}/g, // Multiple exclamation marks
      /\d{4,}/g // Long number sequences
    ];

    let spamScore = 0;
    const lowerMessage = message.toLowerCase();

    // Check for spam keywords
    spamKeywords.forEach(keyword => {
      if (lowerMessage.includes(keyword)) {
        spamScore += 2;
      }
    });

    // Check for suspicious patterns
    suspiciousPatterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        spamScore += matches.length;
      }
    }

    return {
      isSpam: spamScore >= 3,
      score: spamScore,
      message: spamScore >= 3 ? 'Message appears to be spam' : 'Message looks legitimate'
    };
  }

  // Content quality assessment
  assessContentQuality(message) {
    const words = message.trim().split(/\s+/);
    const sentences = message.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const metrics = {
      wordCount: words.length,
      sentenceCount: sentences.length,
      averageWordsPerSentence: words.length / sentences.length,
      hasQuestion: /[?]/.test(message),
      hasGreeting: /^(hi|hello|hey|dear|good morning|good afternoon|good evening)/i.test(message.trim()),
      hasClosing: /(thanks|thank you|regards|sincerely|best)/i.test(message.trim())
    };

    let qualityScore = 0;

    // Word count scoring
    if (metrics.wordCount >= 20 && metrics.wordCount <= 200) {
      qualityScore += 2;
    } else if (metrics.wordCount >= 10 && metrics.wordCount < 20) {
      qualityScore += 1;
    }

    // Sentence structure scoring
    if (metrics.averageWordsPerSentence >= 5 && metrics.averageWordsPerSentence <= 20) {
      qualityScore += 1;
    }

    // Politeness scoring
    if (metrics.hasGreeting) qualityScore += 1;
    if (metrics.hasClosing) qualityScore += 1;
    if (metrics.hasQuestion) qualityScore += 1;

    return {
      score: qualityScore,
      maxScore: 6,
      quality: qualityScore >= 4 ? 'high' : qualityScore >= 2 ? 'medium' : 'low',
      metrics
    };
  }

  // Utility functions
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get validation summary
  getValidationSummary(formData, files = []) {
    const formValidation = this.validateForm(formData);
    const fileValidation = this.validateFiles(files);
    const spamDetection = this.detectSpam(formData.message || '');
    const contentQuality = this.assessContentQuality(formData.message || '');

    return {
      form: formValidation,
      files: fileValidation,
      spam: spamDetection,
      quality: contentQuality,
      overall: {
        valid: formValidation.valid && fileValidation.valid && !spamDetection.isSpam,
        score: contentQuality.score,
        recommendations: this.getRecommendations(formValidation, fileValidation, spamDetection, contentQuality)
      }
    };
  }

  // Get recommendations for improvement
  getRecommendations(formValidation, fileValidation, spamDetection, contentQuality) {
    const recommendations = [];

    if (!formValidation.valid) {
      recommendations.push('Please fix the form validation errors');
    }

    if (!fileValidation.valid) {
      recommendations.push('Please check your file uploads');
    }

    if (spamDetection.isSpam) {
      recommendations.push('Your message appears to be spam. Please provide more details about your project.');
    }

    if (contentQuality.quality === 'low') {
      recommendations.push('Consider adding more details about your project to improve the message quality.');
    }

    if (!contentQuality.metrics.hasGreeting) {
      recommendations.push('Consider adding a greeting to make your message more professional.');
    }

    if (!contentQuality.metrics.hasClosing) {
      recommendations.push('Consider adding a closing to make your message more complete.');
    }

    return recommendations;
  }
}

// Create global instance
const contactValidation = new ContactValidation();

export default contactValidation;
export { ContactValidation };

export { ContactValidation };
