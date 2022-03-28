import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({onClose, isOpen, children}) => {
  if(!isOpen) return null;
  
  const modalRoot = document.getElementById("modals");
 
  return ReactDOM.createPortal (
    <ModalOverlay onClick={onClose}>
      <div className={modalStyles.popupWindow} onClose={onClose}>
        <button onClick={onClose} className={`${modalStyles.closeBtn} mr-10 mt-15`}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </ModalOverlay>
  , modalRoot)
};

export default Modal;