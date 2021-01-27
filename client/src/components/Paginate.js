import Pagination from '@material-ui/lab/Pagination';

export default function Paginate({ numberOfRegisters, registersPerPage, fetchRegisters, type }) {
    const pages = Math.ceil(numberOfRegisters / registersPerPage);

    const onChangePage = (e, value) => {
        fetchRegisters(value, type);
    };

    return (
        <Pagination count={pages} onChange={onChangePage} rowsPerPage={registersPerPage} />
    )
}   