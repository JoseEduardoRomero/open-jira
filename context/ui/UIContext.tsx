import { createContext } from "react";

interface ContextProps {
  isAddingEntry: boolean;
  isDragging: boolean;
  setIsAddingEntry: (value: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
