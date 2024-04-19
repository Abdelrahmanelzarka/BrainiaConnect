// Modal.js
import React from "react";
import './modal.scss';

const Modal = ({ message, closeModal }) => {
  return (
    <div className="mdl animate">
      <div className="mdl-content">
        <p>{message}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
