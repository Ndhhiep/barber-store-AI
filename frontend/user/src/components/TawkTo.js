import { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and append script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/68330ac87b08d5190f6b68a7/1is3m482g';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Cleanup function to remove script when component unmounts
    return () => {
      // Remove the script element
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      // Clean up Tawk widget
      if (window.Tawk_API && window.Tawk_API.onLoad) {
        window.Tawk_API.onLoad = function() {
          window.Tawk_API.hideWidget();
        };
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TawkTo;