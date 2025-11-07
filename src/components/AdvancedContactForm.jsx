import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Upload, 
  Check, 
  X, 
  AlertCircle, 
  FileText, 
  Image, 
  File,
  Loader2,
  Paperclip,
  Trash2
} from 'lucide-react';
import logger from '../utils/logger';

const AdvancedContactForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    projectType: ''
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState({});
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef(null);
  const validationTimeoutRef = useRef(null);

  // Real-time validation
  useEffect(() => {
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    validationTimeoutRef.current = setTimeout(() => {
      validateField();
    }, 500);

    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, [formData]);

  const validateField = async () => {
    setIsValidating(true);
    const newErrors = {};
    const newValidationResults = {};

    // Email validation
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        newValidationResults.email = { valid: false, message: 'Invalid email format' };
      } else {
        newValidationResults.email = { valid: true, message: 'Email looks good' };
      }
    }

    // Phone validation
    if (formData.phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
        newValidationResults.phone = { valid: false, message: 'Invalid phone format' };
      } else {
        newValidationResults.phone = { valid: true, message: 'Phone number looks good' };
      }
    }

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else {
      newValidationResults.firstName = { valid: true, message: 'Looks good' };
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else {
      newValidationResults.lastName = { valid: true, message: 'Looks good' };
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else {
      newValidationResults.message = { valid: true, message: 'Message looks good' };
    }

    setErrors(newErrors);
    setValidationResults(newValidationResults);
    setIsValidating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    }
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];

      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }

      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported.`);
        return false;
      }

      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    } else if (file.type === 'application/pdf') {
      return <FileText className="w-4 h-4" />;
    } else {
      return <File className="w-4 h-4" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form data
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Add files
      files.forEach((file, index) => {
        submitData.append(`file_${index}`, file);
      });

      // Submit form
      if (onSubmit) {
        await onSubmit(submitData);
      } else {
        // Default submission to Formspree or similar service
        const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'YOUR_FORM_ID';
        const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f';
        const response = await fetch(`${formspreeEndpoint}/${formspreeFormId}`, {
          method: 'POST',
          body: submitData
        });

        if (response.ok) {
          alert('Message sent successfully!');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            subject: '',
            message: '',
            budget: '',
            timeline: '',
            projectType: ''
          });
          setFiles([]);
          setErrors({});
          setValidationResults({});
        } else {
          throw new Error('Failed to send message');
        }
      }
    } catch (error) {
      logger.error('Form submission error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
                     formData.firstName && 
                     formData.lastName && 
                     formData.message;

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-light text-center">
          Get In Touch
        </CardTitle>
        <p className="text-accent/80 text-center">
          Tell me about your project and I'll get back to you within 24 hours.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-light mb-2">
                First Name *
              </label>
              <div className="relative">
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full transition-all duration-200 ${
                    errors.firstName 
                      ? 'border-accent/50 focus:border-accent' 
                      : validationResults.firstName?.valid 
                        ? 'border-accent/30 focus:border-accent/50' 
                        : 'border-accent/20 focus:border-accent/40'
                  }`}
                  placeholder="Enter your first name"
                  style={{
                    borderColor: errors.firstName 
                      ? 'rgba(138,234,146,0.5)' 
                      : validationResults.firstName?.valid 
                        ? 'rgba(138,234,146,0.3)' 
                        : 'rgba(138,234,146,0.2)',
                  }}
                />
                {validationResults.firstName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validationResults.firstName.valid ? (
                      <Check className="w-4 h-4" style={{ color: '#8AEA92' }} />
                    ) : (
                      <X className="w-4 h-4" style={{ color: '#8AEA92', opacity: 0.6 }} />
                    )}
                  </div>
                )}
                {isValidating && !validationResults.firstName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#8AEA92', opacity: 0.5 }} />
                  </div>
                )}
              </div>
              {errors.firstName && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92' }}>
                  <AlertCircle className="w-3 h-3" />
                  {errors.firstName}
                </p>
              )}
              {validationResults.firstName?.valid && !errors.firstName && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92', opacity: 0.7 }}>
                  <Check className="w-3 h-3" />
                  {validationResults.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Last Name *
              </label>
              <div className="relative">
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full transition-all duration-200 ${
                    errors.lastName 
                      ? 'border-accent/50 focus:border-accent' 
                      : validationResults.lastName?.valid 
                        ? 'border-accent/30 focus:border-accent/50' 
                        : 'border-accent/20 focus:border-accent/40'
                  }`}
                  placeholder="Enter your last name"
                  style={{
                    borderColor: errors.lastName 
                      ? 'rgba(138,234,146,0.5)' 
                      : validationResults.lastName?.valid 
                        ? 'rgba(138,234,146,0.3)' 
                        : 'rgba(138,234,146,0.2)',
                  }}
                />
                {validationResults.lastName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validationResults.lastName.valid ? (
                      <Check className="w-4 h-4" style={{ color: '#8AEA92' }} />
                    ) : (
                      <X className="w-4 h-4" style={{ color: '#8AEA92', opacity: 0.6 }} />
                    )}
                  </div>
                )}
                {isValidating && !validationResults.lastName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#8AEA92', opacity: 0.5 }} />
                  </div>
                )}
              </div>
              {errors.lastName && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92' }}>
                  <AlertCircle className="w-3 h-3" />
                  {errors.lastName}
                </p>
              )}
              {validationResults.lastName?.valid && !errors.lastName && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92', opacity: 0.7 }}>
                  <Check className="w-3 h-3" />
                  {validationResults.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full transition-all duration-200 ${
                    errors.email 
                      ? 'border-accent/50 focus:border-accent' 
                      : validationResults.email?.valid 
                        ? 'border-accent/30 focus:border-accent/50' 
                        : 'border-accent/20 focus:border-accent/40'
                  }`}
                  placeholder="your@email.com"
                  style={{
                    borderColor: errors.email 
                      ? 'rgba(138,234,146,0.5)' 
                      : validationResults.email?.valid 
                        ? 'rgba(138,234,146,0.3)' 
                        : 'rgba(138,234,146,0.2)',
                  }}
                />
                {validationResults.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validationResults.email.valid ? (
                      <Check className="w-4 h-4" style={{ color: '#8AEA92' }} />
                    ) : (
                      <X className="w-4 h-4" style={{ color: '#8AEA92', opacity: 0.6 }} />
                    )}
                  </div>
                )}
                {isValidating && !validationResults.email && formData.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#8AEA92', opacity: 0.5 }} />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92' }}>
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
              {validationResults.email?.valid && !errors.email && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92', opacity: 0.7 }}>
                  <Check className="w-3 h-3" />
                  {validationResults.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full transition-all duration-200 ${
                    errors.phone 
                      ? 'border-accent/50 focus:border-accent' 
                      : validationResults.phone?.valid 
                        ? 'border-accent/30 focus:border-accent/50' 
                        : 'border-accent/20 focus:border-accent/40'
                  }`}
                  placeholder="+1 (555) 123-4567"
                  style={{
                    borderColor: errors.phone 
                      ? 'rgba(138,234,146,0.5)' 
                      : validationResults.phone?.valid 
                        ? 'rgba(138,234,146,0.3)' 
                        : 'rgba(138,234,146,0.2)',
                  }}
                />
                {validationResults.phone && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validationResults.phone.valid ? (
                      <Check className="w-4 h-4" style={{ color: '#8AEA92' }} />
                    ) : (
                      <X className="w-4 h-4" style={{ color: '#8AEA92', opacity: 0.6 }} />
                    )}
                  </div>
                )}
                {isValidating && !validationResults.phone && formData.phone && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#8AEA92', opacity: 0.5 }} />
                  </div>
                )}
              </div>
              {errors.phone && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92' }}>
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
              {validationResults.phone?.valid && !errors.phone && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92', opacity: 0.7 }}>
                  <Check className="w-3 h-3" />
                  {validationResults.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Company Information */}
          <div>
            <label className="block text-sm font-medium text-light mb-2">
              Company
            </label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your company name"
            />
          </div>

          {/* Project Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-primary border border-accent/20 rounded-md text-light focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Select project type</option>
                <option value="branding">Branding & Identity</option>
                <option value="web-design">Web Design</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="marketing">Marketing Materials</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-primary border border-accent/20 rounded-md text-light focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Select budget range</option>
                <option value="under-1k">Under $1,000</option>
                <option value="1k-5k">$1,000 - $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-plus">$25,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-primary border border-accent/20 rounded-md text-light focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-light mb-2">
              Subject
            </label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Brief description of your project"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-light mb-2">
              Message *
            </label>
            <div className="relative">
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full min-h-[120px] transition-all duration-200 ${
                  errors.message 
                    ? 'border-accent/50 focus:border-accent' 
                    : validationResults.message?.valid 
                      ? 'border-accent/30 focus:border-accent/50' 
                      : 'border-accent/20 focus:border-accent/40'
                }`}
                placeholder="Tell me about your project, goals, and any specific requirements..."
                style={{
                  borderColor: errors.message 
                    ? 'rgba(138,234,146,0.5)' 
                    : validationResults.message?.valid 
                      ? 'rgba(138,234,146,0.3)' 
                      : 'rgba(138,234,146,0.2)',
                }}
              />
              {validationResults.message && (
                <div className="absolute right-3 top-3">
                  {validationResults.message.valid ? (
                    <Check className="w-4 h-4" style={{ color: '#8AEA92' }} />
                  ) : (
                    <X className="w-4 h-4" style={{ color: '#8AEA92', opacity: 0.6 }} />
                  )}
                </div>
              )}
              {isValidating && !validationResults.message && formData.message && (
                <div className="absolute right-3 top-3">
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#8AEA92', opacity: 0.5 }} />
                </div>
              )}
            </div>
            {errors.message && (
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92' }}>
                <AlertCircle className="w-3 h-3" />
                {errors.message}
              </p>
            )}
            {validationResults.message?.valid && !errors.message && (
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#8AEA92', opacity: 0.7 }}>
                <Check className="w-3 h-3" />
                {validationResults.message.message}
              </p>
            )}
            <p className="text-xs text-accent/60 mt-1">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-light mb-2">
              Attach Files (Optional)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-accent bg-accent/10' 
                  : 'border-accent/30 hover:border-accent/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-light mb-2">
                Drag and drop files here, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-accent hover:underline"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-accent/60">
                Supported: Images, PDF, Word docs (Max 10MB each)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-primary/30 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      {getFileIcon(file)}
                      <span className="text-sm text-light">{file.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {formatFileSize(file.size)}
                      </Badge>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-accent text-primary hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdvancedContactForm;

