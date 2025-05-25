import React, { useState } from 'react';

const FallbackChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Simple fallback - can integrate with your backend API
    alert(`Thank you for reaching out! Message: "${message}"\nWe will respond as soon as possible via email or phone.`);
      setMessage('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <div 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}
      >
        💬
      </div>
    );
  }

return (
    <div style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '300px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        zIndex: 1000,
        border: '1px solid #ddd'
    }}>
        <div style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '15px',
            borderRadius: '10px 10px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <h4 style={{ margin: 0, fontSize: '16px' }}>Contact</h4>
            <button 
                onClick={() => setIsOpen(false)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer'
                }}
            >
                ×
            </button>
        </div>
        
        <div style={{ padding: '15px' }}>
            <p style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
                Hello! Please leave us a message:
            </p>
            
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                style={{
                    width: '100%',
                    height: '80px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '10px',
                    fontSize: '14px',
                    resize: 'vertical'
                }}
            />
            
            <button
                onClick={handleSendMessage}
                style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                Send Message
            </button>
            
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                <p>📞 Hotline: 0123-456-789</p>
                <p>📧 Email: contact@barberstore.com</p>
            </div>
        </div>
    </div>
);
};

export default FallbackChat;
