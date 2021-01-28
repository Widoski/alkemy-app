import Pagination from '@material-ui/lab/Pagination';

export default function Paginate({ numberOfRegisters, limit, fetchRegisters }) {
    const pages = Math.ceil(numberOfRegisters / limit);

    const onChangePage = (e, value) => {
        fetchRegisters(value);
    };

    return (
        <Pagination count={pages} onChange={onChangePage} rowsPerPage={limit} />
    )
}   