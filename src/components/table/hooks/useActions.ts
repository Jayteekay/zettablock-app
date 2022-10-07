import { createContext, useCallback, useState } from "react";
import useUpdateField from "../../../data/useUpdateField";
import { API } from "../../../types/data/API";

export type IAction = {
  type: "update";
  id: string;
  from: Partial<API>;
  to: Partial<API>;
};
type IActionContext = {
  actions: IAction[];
  actionIndex: number;
  undo: () => void;
  redo: () => void;
  addAction: (action: IAction) => void;
  removeAction: (index: number) => void;
  resetActions: () => void;
};

export const ActionContext = createContext<IActionContext>({
  actions: [],
  actionIndex: 0,
  undo: () => {},
  redo: () => {},
  addAction: (action: IAction) => {},
  removeAction: (index: number) => {},
  resetActions: () => {},
});

const useActions = () => {
  const { handleUpdate } = useUpdateField();

  const [actionIndex, setActionIndex] = useState(0);
  const [actions, setActions] = useState<IAction[]>([]);

  const undo = useCallback(() => {
    if (actionIndex) {
      const lastAction = actions[actionIndex - 1];
      if (lastAction?.type === "update") {
        handleUpdate({
          id: lastAction.id,
          isUndoOrRedo: true,
          ...lastAction.from,
        });
        setActionIndex((index) => index - 1);
      }
    }
  }, [actions, handleUpdate, actionIndex]);

  const redo = useCallback(() => {
    if (actionIndex !== actions.length) {
      const nextAction = actions[actionIndex];
      if (nextAction?.type === "update") {
        handleUpdate({
          id: nextAction.id,
          isUndoOrRedo: true,
          ...nextAction.to,
        });
        setActionIndex((index) => index + 1);
      }
    }
  }, [actions, handleUpdate, actionIndex]);

  const addAction = useCallback((action: IAction) => {
    setActions((oldActions) => [...oldActions, action]);
    setActionIndex((index) => index + 1);
  }, []);

  const removeAction = useCallback((index: number) => {
    setActions((oldActions) => {
      const newActions = [...oldActions];
      newActions.splice(index, 1);
      return newActions;
    });
    setActionIndex((index) => index - 1);
  }, []);

  const resetActions = useCallback(() => {
    setActions([]);
    setActionIndex(0);
  }, []);

  return { actions, actionIndex, undo, redo, addAction, removeAction, resetActions };
};

export default useActions;
