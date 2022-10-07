import { ChangeEvent, memo, useEffect, useState } from "react"

import styles from "../table.module.scss";

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

    return <div className={styles.search}>
        <input placeholder="Search by keyword" value={value} onChange={handleValueChange} />
    </div>
}

export default memo(SearchInput);