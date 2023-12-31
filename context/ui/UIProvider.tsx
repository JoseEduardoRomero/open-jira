import { useCallback, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setIsAddingEntry = useCallback((value: boolean) => {
    dispatch({ type: "UI - Add Entry", payload: value });
  }, []);

  const startDragging = useCallback(() => {
    dispatch({ type: "UI - Start Dragging" });
  }, []);

  const endDragging = useCallback(() => {
    dispatch({ type: "UI - End Dragging" });
  }, []);

  return (
    <UIContext.Provider
      value={{
        ...state,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
