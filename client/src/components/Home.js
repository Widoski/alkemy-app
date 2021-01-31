import { useEffect, useState, useContext } from 'react';
import { Paper, Card, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, Toolbar, TableContainer } from '@material-ui/core';
import conf from '../conf';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../app.css";
import Appbar from './Appbar';
import moment from 'moment';

const styles = {
    balanceBox: {
        margin: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        background: "#0a043c"
    },
    registerBox: {
        margin: 10,
        height: 100,
        background: "#0a043c"
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    tableTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
        letterSpacing: 8
    },
    linkToRegister: {
        textDecoration: "none",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontWeight: "bold"
    },
    headRow: {
        fontWeight: "bold",
        background: "black",
        color: "white"
    },
    table: {
        margin: 10
    }
};

export default function Home() {
    const [registers, setRegisters] = useState([]);
    const [balance, setBalance] = useState(0);

    let limit = 10;
    let offset = 0;

    useEffect(() => {
        axios.get(`${conf.API_URL}/registers?limit=${limit}&offset=${offset}`)
            .then(res => {
                setRegisters(res.data.rows);

                let income = 0;
                let outcome = 0;

                res.data.rows.forEach(r => {
                    if (r.type === "Income") {
                        income = income + parseInt(r.amount);
                    }
                    if (r.type === "Outcome") {
                        outcome = outcome + parseInt(r.amount);
                    }
                });
                const balance = income - outcome;
                setBalance(balance);
            });
    }, []);

    return (
        <Appbar title="Welcome">
            <Grid container>
                <TableContainer style={styles.table} component={Paper}>
                    <Toolbar>
                        <Typography variant="button" style={styles.tableTitle}>Last registers</Typography>
                    </Toolbar>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell style={styles.headRow}>Type</TableCell>
                                <TableCell style={styles.headRow}>Concept</TableCell>
                                <TableCell style={styles.headRow}>Date</TableCell>
                                <TableCell style={styles.headRow}>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                registers.map(r => (
                                    <TableRow key={r.id} hover>
                                        <TableCell>{r.type}</TableCell>
                                        <TableCell>{r.concept}</TableCell>
                                        <TableCell>{moment(r.createdAt).format("ll")}</TableCell>
                                        <TableCell>{`$${r.amount}`}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container item xs={12}>
                    <Grid item xs={6}>
                        <Card style={styles.balanceBox}>
                            <Typography variant="button" style={styles.title}>Balance</Typography>
                            <Typography variant="button" style={styles.title}>{`$${balance}`}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card style={styles.registerBox}>
                            <Typography variant="button">
                                <Link className="linkToRegister" style={styles.linkToRegister} to="/registers">My registers</Link>
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Appbar>
    );
};
