import { useState, MouseEvent } from "react";
import useDeleteRecord from "../../../data/useDeleteRecord";
import { API } from "../../../types/data/API"
import EdittableDescription from "./EdittableDescription";

type RowProps = {
    data: API;
}
const Row = ({ data }: RowProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setIsCollapsed(value => !value);
    }

    const { handleDelete } = useDeleteRecord({ id: data.id });
    const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        handleDelete();
    }

    return <>
        <tr onClick={toggleCollapsed}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.operationName}</td>
            <td>{data.type}</td>
            <td><EdittableDescription id={data.id} value={data.description} /></td>
            <td>{data.createdAt}</td>
            <td>{data.updatedAt}</td>
            <td><button onClick={handleDeleteClick}>Delete</button></td>
        </tr>
        {!isCollapsed && <tr>
            <td colSpan={7}>
                <pre>{data.query}</pre>
            </td>
        </tr>}
    </>
}
export default Row;