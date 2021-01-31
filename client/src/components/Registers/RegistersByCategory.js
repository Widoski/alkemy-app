import { useEffect, useState } from "react"
import { Grid, MenuItem, Paper, Select, Typography, InputLabel, TableContainer, TableHead, TableBody, Table, TableRow, TableCell } from "@material-ui/core";
import axios from "axios"
import conf from "../../conf"
import Paginate from '../Paginate';
import moment from 'moment';

const styles = {
    container: {
        width: "100%",
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        textAlign: "center",
        margin: 20
    },
    headRow: {
        fontWeight: "bold"
    },
};

export default function RegistersByCategory() {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [registers, setRegisters] = useState([]);
    const [registersCount, setRegistersCount] = useState([]);

    const type = "outcome";
    const limit = 5;
    let offset = 0;

    useEffect(() => {
        axios.get(`${conf.API_URL}/categories`)
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const onChangeHandler = (e) => {
        const categoryId = e.target.value;
        setCategoryId(categoryId);

        axios.get(`${conf.API_URL}/registers/category/${categoryId}?limit=${limit}&type=${type}`)
            .then(res => {
                setRegisters(res.data.rows);
                setRegistersCount(res.data.count);
            })
            .catch(err => console.log(err));
    };

    const fetchRegisters = (page) => {
        if (page === 1) {
            offset = 0;
        } else {
            offset = limit * (page - 1);
        }
        axios.get(`${conf.API_URL}/registers/category/${categoryId}?limit=${limit}&offset=${offset}&type=${type}`)
            .then(res => {
                setRegisters(res.data.rows);
            })
            .catch(err => console.log(err));
    };

    return (
        <Grid container>
            <div style={styles.container}>
                <InputLabel style={styles.fields} id="category">
                    <Typography variant="button">Select category</Typography>
                </InputLabel>
                <Select
                    name="category"
                    labelId="category"
                    onChange={onChangeHandler}
                    value={categoryId}
                >
                    {
                        categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))
                    }
                </Select>
                {
                    registers.length ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.headRow}>Date</TableCell>
                                        <TableCell style={styles.headRow}>Concept</TableCell>
                                        <TableCell style={styles.headRow}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        registers.map(register => (
                                            <TableRow key={register.id}>
                                                <TableCell>{moment(register.createdAt).format("l")}</TableCell>
                                                <TableCell>{register.concept}</TableCell>
                                                <TableCell>{`$${register.amount}`}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                            <Paginate count={registersCount} limit={limit} fetchRegisters={fetchRegisters} />
                        </TableContainer>
                    ) : null
                }
            </div>
        </Grid>
    );
};
