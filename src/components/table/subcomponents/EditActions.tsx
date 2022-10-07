import { useContext } from "react";
import { ActionContext } from "../hooks/useActions";

import styles from "../table.module.scss";

const EditActions = () => {
    const { undo, redo, actionIndex, actions } = useContext(ActionContext);

    return <div className={styles.edit_actions}>
        <button disabled={!actionIndex} onClick={undo}>Undo &#8634;</button>
        <button disabled={actionIndex >= actions.length} onClick={redo}>Redo &#8635;</button>
    </div>
}

export default EditActions