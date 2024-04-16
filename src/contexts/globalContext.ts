import { createContext, useContext } from "react";

type TContext = {
  score: number
  game: 'ORIGINAL' | 'BONUS'
  incrementScore: () => void;
  decrementScore: () => void;
}

export const globalContext = createContext<TContext | null>(null);

export const useGlobalContext = () => {
  const context = useContext(globalContext);

  if (context === null) {
    throw new Error("useGlobalContext must be called inside globalContext.Provider")
  }
  
  return context;
}

