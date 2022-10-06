import { useMemo, useState } from "react";
import { API } from "../../../types/data/API";
import Row from "./Row";

type APITableProps = { data: API[] }
const Table = ({ data }: APITableProps) => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);

    const sortBy = (column: string) => setSortColumn(column);
    const displayData = useMemo(() => sortColumn ? data.sort((a, b) => {
        if (sortColumn === "name") {
            return a[sortColumn].localeCompare(b[sortColumn])
        }
        if (sortColumn === "id") {
            return +a[sortColumn] > +b[sortColumn] ? 1 : -1
        }
        return 0;
    }) : data, [sortColumn, data])

    return <table>
        <thead>
            <tr>
                <th><button onClick={() => sortBy("id")}>ID</button></th>
                <th><button onClick={() => sortBy("name")}>Name</button></th>
                <th>Operation Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {displayData.map(rowData => <Row key={rowData.id} data={rowData} />)}
        </tbody>
    </table>
}
export default Table;