import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import { modalContext } from '../contexts/modalContext';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  return createPortal(
    <Transition nodeRef={ref} in={open} timeout={300} mountOnEnter unmountOnExit>
      {(status) => (
        <div
          ref={ref}
          className={`modal-backdrop ${status}`}
          onClick={() => onClose()}
        >
          <modalContext.Provider value={{ status }}>
            {children}
          </modalContext.Provider>
        </div>
      )}
    </Transition>,
    document.body
  );
}
