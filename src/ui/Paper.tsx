import { ComponentPropsWithoutRef, forwardRef } from "react";

type PaperProps = ComponentPropsWithoutRef<'div'>

const Paper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`paper ${props.className}`}
    >
      {props.children}
    </div>
  )
})

export default Paper;
