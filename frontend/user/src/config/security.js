// Security configuration for the application
export const CSP_CONFIG = {
  // API endpoints that should be allowed
  ALLOWED_API_ENDPOINTS: [
    'https://barber-store-ai.onrender.com',
    'https://api.cloudinary.com',
    'https://embed.tawk.to',
    'https://tawk.to',
    'wss://tawk.to'
  ],
  
  // Script sources
  ALLOWED_SCRIPT_SOURCES: [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://embed.tawk.to',
    'https://tawk.to'
  ],
  
  // Style sources
  ALLOWED_STYLE_SOURCES: [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://cdn.jsdelivr.net'
  ],
  
  // Font sources
  ALLOWED_FONT_SOURCES: [
    "'self'",
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net'
  ]
};

// Function to generate CSP string
export const generateCSPString = () => {
  const { ALLOWED_API_ENDPOINTS, ALLOWED_SCRIPT_SOURCES, ALLOWED_STYLE_SOURCES, ALLOWED_FONT_SOURCES } = CSP_CONFIG;
  
  return `default-src 'self'; script-src ${ALLOWED_SCRIPT_SOURCES.join(' ')}; style-src ${ALLOWED_STYLE_SOURCES.join(' ')}; font-src ${ALLOWED_FONT_SOURCES.join(' ')}; img-src 'self' data: https:; connect-src 'self' ${ALLOWED_API_ENDPOINTS.join(' ')}; frame-src https://embed.tawk.to https://tawk.to; worker-src 'self' blob:;`;
};

export default CSP_CONFIG;
