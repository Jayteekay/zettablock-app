import { useContext } from "react";
import { ActionContext } from "./hooks/useActions";

const EditActions = () => {
    const { undo, redo, actionIndex, actions } = useContext(ActionContext);

    return <div>
        <button disabled={!actionIndex} onClick={undo}>Undo</button>
        <button disabled={actionIndex >= actions.length} onClick={redo}>Redo</button>
    </div>
}

export default EditActions