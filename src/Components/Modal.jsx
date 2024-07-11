import React from "react";

const Modal = ({ isOpen, setIsModalOpen, children }) => {
  return (
    <div
      className={isOpen ? "my_modal active" : "my_modal"}
    //   onClick={() => setIsModalOpen(false)}
    >
      <div
        className={isOpen ? "my_modal__content active" : "my_modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
            {children}
        
        <div className="button-container">
            <button
            className="btn btn-primary modal-close-btn"
            onClick={() => setIsModalOpen(false)}
            >
                Сlose
            </button>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;