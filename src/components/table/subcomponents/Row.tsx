import { useState } from "react";
import { API } from "../../../types/data/API"

type RowProps = {
    data: API;
}
const Row = ({ data }: RowProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setIsCollapsed(value => !value);
    }
    return <>
        <tr onClick={toggleCollapsed}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.operationName}</td>
            <td>{data.type}</td>
            <td>{data.description}</td>
            <td>{data.createdAt}</td>
            <td>{data.updatedAt}</td>
        </tr>
        {!isCollapsed && <tr>
            <td colSpan={7}>
                <pre>{data.query}</pre>
            </td>
        </tr>}
    </>
}
export default Row;