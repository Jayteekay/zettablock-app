type PaginationProps = {
    total: number;
    perPage: number;
    page: number;
    setPage: (page: number) => void
}
const Pagination = ({ total, perPage, page, setPage }: PaginationProps) => {
    const numberOfPages = Math.ceil(total / perPage);
    return <section>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}> &#8249; </button>
        {[...Array(numberOfPages)].map(
            (e, index) =>
                <button key={index} onClick={() => setPage(index + 1)} disabled={index === page - 1}>{index + 1}</button>
        )
        }
        <button onClick={() => setPage(page + 1)} disabled={page === numberOfPages}>&#8250;</button>
    </section>
}

export default Pagination;