# Environment Variables Configuration

This document describes the environment variables used in the project.

## Required Environment Variables

### Formspree Configuration
- `VITE_FORMSPREE_FORM_ID` - Your Formspree form ID (default: 'mandzwvb')
- `VITE_FORMSPREE_ENDPOINT` - Formspree API endpoint (default: 'https://formspree.io/f')

## Optional Environment Variables

### Email Validation API
- `VITE_EMAIL_VALIDATION_API_KEY` - API key for email validation service
- `VITE_EMAIL_VALIDATION_ENDPOINT` - Email validation API endpoint (default: 'https://api.email-validator.net/api/verify')

### PWA Configuration
- `VITE_VAPID_PUBLIC_KEY` - VAPID public key for push notifications

### Google Analytics
- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID (e.g., 'G-XXXXXXXXXX')

### Environment
- `VITE_ENV` - Environment name (development/production)

## Setup Instructions

1. Create a `.env` file in the root directory
2. Copy the variables you need from the example below
3. Fill in your actual values
4. Never commit `.env` to version control (it's already in .gitignore)

## Example .env File

```env
# Formspree Configuration
VITE_FORMSPREE_FORM_ID=your_formspree_form_id_here
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f

# Email Validation API (Optional)
VITE_EMAIL_VALIDATION_API_KEY=your_email_validation_api_key_here
VITE_EMAIL_VALIDATION_ENDPOINT=https://api.email-validator.net/api/verify

# PWA Configuration (Optional)
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key_here

# Google Analytics (Optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Environment
VITE_ENV=development
```

## Netlify Configuration

To set environment variables in Netlify:

1. Go to your site's dashboard
2. Navigate to Site settings > Environment variables
3. Add each variable with its value
4. Redeploy your site

## Important Notes

- All Vite environment variables must be prefixed with `VITE_` to be accessible in the client-side code
- Environment variables are replaced at build time, not runtime
- After changing environment variables, you need to rebuild the application
- Never expose sensitive keys in client-side code - use server-side endpoints for sensitive operations

