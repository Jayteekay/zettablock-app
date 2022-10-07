import { useEffect, useMemo, useState } from "react";
import useFetchAPIs from "../../data/useFetchAPIs";
import useActions, { ActionContext } from "./hooks/useActions";
import Pagination from "./subcomponents/Pagination";
import SearchInput from "./subcomponents/SearchInput";
import Table from "./subcomponents/Table";
import EditActions from "./EditActions";

const PER_PAGE = 10;

const APITable = () => {
    const { data, isLoading, isError } = useFetchAPIs();

    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);

    const actionsConfig = useActions();

    const filteredData = useMemo(() => {
        return searchValue ? data?.filter(api => {
            return api.name.includes(searchValue) || api.description.includes(searchValue)
        }) : data
    }, [data, searchValue])


    const paginatedData = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        const end = (page) * PER_PAGE
        return filteredData?.slice(start, end)
    }, [filteredData, page])

    //Reset Pagination if search value changes
    useEffect(() => {
        setPage(1)
    }, [searchValue])


    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Unable to fetch data</span>
    }

    if (!paginatedData) {
        return <span>No available data</span>
    }


    return <ActionContext.Provider value={actionsConfig}>
        <div>
            <EditActions />
            <SearchInput onSearch={(value) => { setSearchValue(value) }} />
            <Table data={paginatedData} />
            <Pagination total={filteredData?.length || 0} perPage={PER_PAGE} page={page} setPage={setPage} />
        </div>
    </ActionContext.Provider>
}

export default APITable;