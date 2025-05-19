import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastNotification = ({ show, onClose, message, variant = 'success' }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999
      }}
    >
      <Toast 
        show={show} 
        onClose={onClose} 
        delay={3000} 
        autohide
        className={`bg-${variant} text-white`}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">
            {variant === 'success' ? '✓ Success' : '⚠ Alert'}
          </strong>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
          />
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastNotification;