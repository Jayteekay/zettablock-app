import useFetchAPIs from "../../data/useFetchAPIs";
import Table from "./subcomponents/Table";

const APITable = () => {
    const { data, isLoading, isError } = useFetchAPIs();
    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Unable to fetch data</span>
    }

    if (!data) {
        return <span>No available data</span>
    }
    
    return <Table data={data}/>
}

export default APITable;