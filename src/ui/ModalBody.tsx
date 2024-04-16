import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { useModalContext } from '../contexts/modalContext'

type ModalBodyProps = ComponentPropsWithoutRef<'div'>

const Modalbody = forwardRef<HTMLDivElement, ModalBodyProps>((props, ref) => {
  const { status } = useModalContext();

  return (
    <div
      {...props}
      ref={ref}
      className={`modal-body ${status} ${props.className}`}
      onClick={(e) => { e.stopPropagation(); props.onClick?.(e) }}
    >
      {props.children}
    </div>
  )
})

export default Modalbody;
