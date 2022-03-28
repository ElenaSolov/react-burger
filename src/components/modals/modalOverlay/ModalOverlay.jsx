import React, {useEffect, useCallback} from 'react';
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ({children, onClick}) => {

  const closeByOverlay = useCallback(evt => {
    if(evt.key === 'Escape') {
    onClick();
    }
  }, [onClick]);

 useEffect(
 ()=>{document.addEventListener('keydown', closeByOverlay)},
 [closeByOverlay]
 );

return (
    <div className={modalOverlayStyles.overlay} onClick={onClick} onKeyPress={closeByOverlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;