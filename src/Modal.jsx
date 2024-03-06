
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './MovieBox.css'

export default function Modal({ open, children, onClose }) {
    const dialogRef = useRef();
    useEffect(() => {
        if (open) {
            dialogRef.current.showModal();
        }
        return () => dialogRef.current.close();
    }, [open])

    return createPortal(
        
            <dialog ref={dialogRef} className='modal-box' onClose={onClose}>
                {children}
            </dialog>, document.getElementById('modal')
    );

}



