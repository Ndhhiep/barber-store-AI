import { useEffect, useState } from 'react';

const CSPDebugger = () => {
  const [cspViolations, setCspViolations] = useState([]);
  const [isDebugMode, setIsDebugMode] = useState(false);

  useEffect(() => {
    // Only show in development or when debug param is present
    const urlParams = new URLSearchParams(window.location.search);
    const debug = urlParams.get('debug') === 'csp' || process.env.NODE_ENV === 'development';
    setIsDebugMode(debug);

    if (!debug) return;

    // Listen for CSP violations
    const handleCSPViolation = (event) => {
      console.warn('CSP Violation:', event);
      setCspViolations(prev => [...prev, {
        id: Date.now(),
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        timestamp: new Date().toLocaleTimeString()
      }]);
    };

    // Add event listener for CSP violations
    document.addEventListener('securitypolicyviolation', handleCSPViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    };
  }, []);

  // Test connectivity to required services
  const testConnections = async () => {
    const testUrls = [
      'https://barber-store-ai.onrender.com/api/health',
      'https://embed.tawk.to/health', // This might not exist, but tests connectivity
      'https://va.tawk.to/health'
    ];

    for (const url of testUrls) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        console.log(`✅ ${url} - Status: ${response.status}`);
      } catch (error) {
        console.log(`❌ ${url} - Error: ${error.message}`);
      }
    }
  };

  if (!isDebugMode) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      maxHeight: '200px',
      overflow: 'auto',
      zIndex: 10000
    }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>CSP Debug Mode</strong>
        <button 
          onClick={testConnections}
          style={{
            marginLeft: '10px',
            padding: '2px 8px',
            fontSize: '11px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Test Connections
        </button>
        <button 
          onClick={() => setCspViolations([])}
          style={{
            marginLeft: '5px',
            padding: '2px 8px',
            fontSize: '11px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </div>
      
      {cspViolations.length === 0 ? (
        <div style={{ color: '#28a745' }}>No CSP violations detected</div>
      ) : (
        <div>
          <strong>CSP Violations ({cspViolations.length}):</strong>
          {cspViolations.slice(-5).map(violation => (
            <div key={violation.id} style={{ 
              margin: '5px 0', 
              padding: '5px',
              background: 'rgba(220,53,69,0.2)',
              borderRadius: '3px'
            }}>
              <div><strong>Blocked:</strong> {violation.blockedURI}</div>
              <div><strong>Directive:</strong> {violation.violatedDirective}</div>
              <div><strong>Time:</strong> {violation.timestamp}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CSPDebugger;
