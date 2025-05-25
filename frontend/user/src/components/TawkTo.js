import { useEffect, useState } from 'react';
import FallbackChat from './FallbackChat';

const TawkTo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Prevent multiple initialization
    if (window.Tawk_API && window.Tawk_LoadStart) {
      setIsLoaded(true);
      return;
    }

    // Set timeout for fallback
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Tawk.to failed to load, showing fallback chat');
        setShowFallback(true);
      }
    }, 10000); // 10 seconds timeout

    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        // Initialize Tawk_API
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        // Add callbacks
        window.Tawk_API.onLoad = function() {
          setIsLoaded(true);
          setShowFallback(false);
          clearTimeout(fallbackTimer);
          console.log('Tawk.to loaded successfully');
        };

        window.Tawk_API.onStatusChange = function(status) {
          console.log('Tawk.to status:', status);
        };

        // Enhanced error handling
        window.Tawk_API.onChatMaximized = function() {
          console.log('Tawk.to chat maximized');
        };        // Create script with enhanced attributes
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://embed.tawk.to/68330ac87b08d5190f6b68a7/1is3m482g';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', 'anonymous');
        script.setAttribute('data-cfasync', 'false');
        script.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        script.setAttribute('data-turbo-track', 'reload');
        
        // Handle load events
        script.onload = () => {
          console.log('Tawk.to script loaded successfully');
          
          // Additional configuration for Tawk.to
          if (window.Tawk_API) {
            window.Tawk_API.customStyle = {
              visibility: {
                desktop: {
                  position: 'br',
                  xOffset: 20,
                  yOffset: 20
                },
                mobile: {
                  position: 'br',
                  xOffset: 10,
                  yOffset: 10
                }
              }
            };
          }
        };
        
        script.onerror = (err) => {
          console.error('Failed to load Tawk.to script:', err);
          setError('Failed to load chat widget');
          setShowFallback(true);
          clearTimeout(fallbackTimer);
        };
        
        // Insert script
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        } else {
          document.head.appendChild(script);
        }

      } catch (err) {
        console.error('Error initializing Tawk.to:', err);
        setError('Chat initialization failed');
        setShowFallback(true);
        clearTimeout(fallbackTimer);
      }
    }, 1000); // Delay 1 second

    // Cleanup
    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        try {
          window.Tawk_API.hideWidget();
        } catch (err) {
          console.warn('Error hiding Tawk widget:', err);
        }
      }
    };
  }, [isLoaded]);

  // Show fallback chat if Tawk.to fails to load
  if (showFallback) {
    return <FallbackChat />;
  }

  return null;
};

export default TawkTo;