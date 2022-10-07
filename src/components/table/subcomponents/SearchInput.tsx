import { ChangeEvent, memo, useEffect, useState } from "react"

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
    const [value, setValue] = useState("");
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    //Debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(value)
        }, 300);
        return () => {
            clearTimeout(timeout)
        }
    }, [value, onSearch])

    return <input placeholder="Search by keyword" value={value} onChange={handleValueChange} />
}

export default memo(SearchInput);