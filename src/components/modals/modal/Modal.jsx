import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({ onClose, isOpen, children, header }) => {
  const modalRoot = document.getElementById("modals");

  return ReactDOM.createPortal(
    isOpen && (
      <>
        <div
          className={`${modalStyles.popupWindow} pl-10 pr-10`}
          onClose={onClose}
        >
          <div className={`${modalStyles.header} mt-10`}>
            {header && (
              <p className={`${modalStyles.text} text text_type_main-large`}>
                {header}
              </p>
            )}
            <button
              onClick={onClose}
              className={`${modalStyles.closeBtn} closeBtn`}
            >
              <CloseIcon onClick={onClose} />
            </button>
          </div>
          {children}
        </div>
        <ModalOverlay onClick={onClose}></ModalOverlay>
      </>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
};
export default Modal;
