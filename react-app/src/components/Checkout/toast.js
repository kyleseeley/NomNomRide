import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose, type }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  const toastClassName = `toast ${type ? `toast-${type}` : ""}`;

  return (
    <div className={toastClassName}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
