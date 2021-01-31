import Pagination from '@material-ui/lab/Pagination';

export default function Paginate({ count, limit, fetchRegisters }) {
    const pages = Math.ceil(count / limit);

    const onChangePage = (e, value) => {
        fetchRegisters(value);
    };

    return (
        <Pagination count={pages} onChange={onChangePage} rowsperpage={limit} />
    );
} 