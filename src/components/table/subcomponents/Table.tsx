import { API } from "../../../types/data/API";
import Row from "./Row";

type APITableProps = { data: API[] }
const Table = ({ data }: APITableProps) => {
    return <table>
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Operation Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Created at</th>
            <th>Updated at</th>
        </thead>
        <tbody>
            {data.map(rowData => <Row data={rowData} />)}
        </tbody>
    </table>
}
export default Table;