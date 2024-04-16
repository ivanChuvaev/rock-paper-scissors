import { createContext, useContext } from "react";
import { TransitionStatus } from "react-transition-group";

type TContext = {
  status: TransitionStatus
}

export const modalContext = createContext<TContext | null>(null);

export const useModalContext = () => {
  const context = useContext(modalContext);

  if (context === null) {
    throw new Error("useModalContext must be called inside modalContext.Provider")
  }
  
  return context;
}
