import { useMemo, useState } from "react";
import useFetchAPIs from "../../data/useFetchAPIs";
import SearchInput from "./subcomponents/SearchInput";
import Table from "./subcomponents/Table";

const APITable = () => {
    const { data, isLoading, isError } = useFetchAPIs();

    const [searchValue, setSearchValue] = useState("");

    const displayData = useMemo(() => {
        return searchValue ? data?.filter(api => {
            return api.name.includes(searchValue) || api.description.includes(searchValue)
        }) : data
    }, [data, searchValue])


    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Unable to fetch data</span>
    }

    if (!displayData) {
        return <span>No available data</span>
    }


    return <div>
        <SearchInput onSearch={(value) => { setSearchValue(value) }} />
        <Table data={displayData} />
    </div>
}

export default APITable;