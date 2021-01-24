import { useEffect, useState } from 'react';
import { Paper, Card, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, Toolbar } from '@material-ui/core';
import conf from '../conf';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../app.css";
import Appbar from './Appbar';

const styles = {
    balanceBox: {
        margin: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        background: "#493323"
    },
    registerBox: {
        margin: 10,
        height: 100,
        background: "#493323"
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    tableTitle: {
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
        textAlign: "center"
    },
    linkToRegister: {
        textDecoration: "none",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontWeight: "bold"
    }
}

export default function Home() {
    const [registers, setRegisters] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get(`${conf.API_URL}/registers`)
            .then(res => {
                setRegisters(res.data);

                let income = 0;
                let outcome = 0;

                registers.forEach(r => {
                    if (r.type === "income") {
                        income = income + r.amount;
                    }
                    if (r.type === "outcome") {
                        outcome = outcome + r.amount;
                    }
                })

                const balance = income - outcome;
                setBalance(balance);

            })
    }, [])

    console.log(balance)

    return (
        <Grid container>
            <Appbar title="Bienvenido">
                <Grid item xs={12} xl={6}>
                    <Toolbar>
                        <Typography variant="button" style={styles.tableTitle}> Ultimos registros</Typography>
                    </Toolbar>
                    <Table style={styles.table} component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Concepto</TableCell>
                                <TableCell>Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                registers.map(r => (
                                    <TableRow key={r.id}>
                                        <TableCell>{r.type}</TableCell>
                                        <TableCell>{r.concept}</TableCell>
                                        <TableCell>{`$${r.amount}`}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Grid>
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
                                <Link className="linkToRegister" style={styles.linkToRegister} to="/registers">Ver registros</Link>
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Appbar>
        </Grid>
    )
}
