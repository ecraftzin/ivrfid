import React from 'react';
import { Link } from 'react-router-dom';

const ErrorMessage = ({ 
  title = 'Oops! Something went wrong', 
  message = 'We encountered an error while loading this content. Please try again later.',
  showHomeButton = true 
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      padding: '40px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '4rem',
        color: '#e74c3c',
        marginBottom: '20px'
      }}>
        ⚠️
      </div>
      <h2 style={{
        color: '#1e293b',
        fontSize: '1.8rem',
        fontWeight: '600',
        marginBottom: '15px'
      }}>
        {title}
      </h2>
      <p style={{
        color: '#64748b',
        fontSize: '1.1rem',
        marginBottom: '30px',
        maxWidth: '600px'
      }}>
        {message}
      </p>
      {showHomeButton && (
        <Link 
          to="/"
          style={{
            background: '#5227FF',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#4119cc'}
          onMouseOut={(e) => e.target.style.background = '#5227FF'}
        >
          Go to Homepage
        </Link>
      )}
    </div>
  );
};

export default ErrorMessage;

