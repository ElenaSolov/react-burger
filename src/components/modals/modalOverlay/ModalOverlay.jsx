import React, {useEffect, useCallback} from 'react';
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ({children, onClick}) => {
  const closeByEsc = useCallback(evt => {

    if(evt.key === 'Escape') {
    onClick();
    }
  }, [onClick]);

 useEffect(()=>{
 document.addEventListener('keydown', closeByEsc);
 return () => {
 document.removeEventListener('keydown', closeByEsc);
 }
 },
 [closeByEsc]
 );
 const closeByClick = (evt) => {
 if(evt.target.classList.contains('overlay')){
 onClick();
 }

 }

return (
    <div className={`${modalOverlayStyles.overlay} overlay`} onClick={closeByClick} onKeyPress={closeByEsc}>
      {children}
    </div>
  );
};

export default ModalOverlay;