import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../services/actions/modalActions.js";
import { useNavigate } from "react-router-dom";

const Modal = ({ children, header }) => {
  const modalState = useSelector((store) => store.modal);
  const open = modalState.openIngredientModal
    ? true
    : modalState.openOrderModal
    ? true
    : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    dispatch(closeModal());
    navigate("/");
  };

  const modalRoot = document.getElementById("modals");

  return ReactDOM.createPortal(
    open && (
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
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
};
export default Modal;
