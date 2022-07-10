import React, { useEffect, useCallback, FC } from "react";
import modalOverlayStyles from "./modalOverlay.module.css";

interface IModalOverlay {
  onClick: () => void;
}
const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
  const closeByEsc = useCallback(
    (evt : KeyboardEvent ) => {
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

  const closeByClick = (evt: React.SyntheticEvent) => {
    const target = evt.target as HTMLDivElement;
    if (target.classList.contains("overlay")) {
      onClick();
    }
  };

  return (
    <div
      className={`${modalOverlayStyles.overlay} overlay`}
      onClick={closeByClick}
    />
  );
};

export default ModalOverlay;
