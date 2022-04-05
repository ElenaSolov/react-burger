import React, { useEffect, useCallback } from "react";
import modalOverlayStyles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick }) => {
  const closeByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        onClick();
      }
    },
    [onClick]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [closeByEsc]);

  const closeByClick = (evt) => {
    if (evt.target.classList.contains("overlay")) {
      onClick();
    }
  };

  return (
    <div
      className={`${modalOverlayStyles.overlay} overlay`}
      onClick={closeByClick}
    ></div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
