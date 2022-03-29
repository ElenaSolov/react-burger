import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({onClose, isOpen, children, header}) => {
  if(!isOpen) return null;
  console.dir(onClose)
  
  const modalRoot = document.getElementById("modals");
 
  return ReactDOM.createPortal (
    <ModalOverlay onClick={onClose}>
      <div className={`${modalStyles.popupWindow} pl-10 pr-10`} onClose={onClose}>
      <div className={`${modalStyles.header} mt-10`}>
      {header&&<p className={`${modalStyles.text} text text_type_main-large`}>{header}</p>}
        <button onClick={onClose} className={`${modalStyles.closeBtn} closeBtn`}>
          <CloseIcon onClick={onClose}/>
        </button>
      </div>
        {children}
      </div>
    </ModalOverlay>
  , modalRoot)
};

export default Modal;