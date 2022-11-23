import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
  children: JSX.Element;
  header?: string;
  onClose: () => void;
}
const Modal = ({ children, header, onClose }: IModal): JSX.Element => {
  const modalRoot = document.getElementById("modals") as HTMLDivElement;

  return ReactDOM.createPortal(
    <>
      <div className={`${modalStyles.popupWindow} pl-10 pr-10`}>
        <div className={`${modalStyles.header} mt-10`}>
          {header && (
            <p className={`${modalStyles.text} text text_type_main-large`}>
              {header}
            </p>
          )}
          <button className={`${modalStyles.closeBtn} closeBtn`}>
            <CloseIcon onClick={onClose} type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
