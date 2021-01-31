import { useState, useEffect, useContext } from 'react';
import { Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paginate from '../Paginate';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import conf from '../../conf';
import axios from 'axios';
import moment from 'moment';
import AppContext from '../../appContext';

const styles = {
    incomeRow: {
        background: "#a0c1b8"
    },
    headRow: {
        fontWeight: "bold"
    },
    link: {
        textDecoration: "none",
        color: "white",
        width: "100%",
        margin: 10
    },
    title: {
        fontWeight: "bold",
    },
    table: {
        margin: 20
    }
};

export default function RegistersIncome({ properties }) {
    const context = useContext(AppContext);

    const [registersIncome, setRegistersIncome] = useState([]);
    const [incomeCount, setIncomeCount] = useState(0);

    const type = "Income";
    const limit = 5;
    let offset = 0;

    useEffect(() => {
        fetchRegisters(1);
    }, []);

    const fetchRegisters = (page) => {
        if (page === 1) {
            offset = 0;
        } else {
            offset = limit * (page - 1);
        }
        axios.get(`${conf.API_URL}/registers?limit=${limit}&offset=${offset}&type=${type}`)
            .then(res => {
                setRegistersIncome(res.data.rows);
                setIncomeCount(res.data.count);
            });
    };

    const handleEditRegister = id => () => {
        properties.history.push(`/registers/edit/${id}`);
    };

    const handleDeleteRegister = id => () => {
        axios.delete(`${conf.API_URL}/registers/${id}`)
            .then(res => {
                axios.get(`${conf.API_URL}/registers?limit=${limit}&offset=${offset}&type=${type}`)
                    .then(res => {
                        setRegistersIncome(res.data.rows);
                        setIncomeCount(res.data.count);
                        context.handleSnackbar("success", "Register deleted", true);
                    });
            })
            .catch(err => context.handleSnackbar("error", "Cannot delete register", true));
    };

    return (
        <Grid container>
            <TableContainer component={Paper} style={styles.table}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles.headRow}>Concept</TableCell>
                            <TableCell style={styles.headRow}>Date</TableCell>
                            <TableCell style={styles.headRow}>Amount</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            registersIncome.map(r => (
                                <TableRow key={r.id} style={styles.incomeRow} hover>
                                    <TableCell>{r.concept}</TableCell>
                                    <TableCell>{moment(r.createdAt).format("l")}</TableCell>
                                    <TableCell>{`$${r.amount}`}</TableCell>
                                    <TableCell>
                                        <Button onClick={handleEditRegister(r.id)} color="secondary">
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={handleDeleteRegister(r.id)} color="secondary">
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <Paginate count={incomeCount} limit={limit} fetchRegisters={fetchRegisters} />
            </TableContainer>
            <Link style={styles.link} to="/registers/create">
                <Button fullWidth variant="contained" color="primary">
                    New register
                </Button>
            </Link>
        </Grid >
    );
};
