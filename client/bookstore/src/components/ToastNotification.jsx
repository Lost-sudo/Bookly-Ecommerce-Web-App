import React from "react";
import { Toast } from "react-bootstrap";

const ToastNotification = ({ show, onClose, message, variant = "success" }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <Toast
        show={show}
        onClose={onClose}
        delay={3000}
        autohide
        className="text-white"
        style={{
          backgroundColor:
            variant === "success"
              ? "var(--color-primary)"
              : "var(--color-card)",
          color: "var(--color-text)",
        }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">
            {variant === "success" ? "✓ Success" : "⚠ Alert"}
          </strong>
          <button type="button" className="btn-close" onClick={onClose} />
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastNotification;
