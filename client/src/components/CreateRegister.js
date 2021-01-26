import { useState } from 'react';
import { Button, Paper, TextField, Select, MenuItem, Snackbar, Grid, InputLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Appbar from './Appbar';
import conf from '../conf';
import axios from 'axios';

const styles = {
    formContainer: {
        margin: 20,
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    fields: {
        margin: 10
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Registers() {
    const [snackAlert, setSnackAlert] = useState({
        status: "",
        alert: "",
        message: "",
        open: false
    });

    const [form, setForm] = useState({
        concept: "",
        amount: "",
        type: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        axios.post(`${conf.API_URL}/registers`, form)
            .then(res => {
                console.log(res.data);
                handleSnackbar("success", "Registro creado", true);
            })
            .catch(err => handleSnackbar("error", "No se pudo crear el registro", true));
    }

    const handleSnackbar = (status, message, boolean) => {
        setSnackAlert({
            ...snackAlert,
            status,
            message,
            open: boolean
        });
    };

    const handleCloseSnackAlert = () => {
        setSnackAlert({
            ...snackAlert,
            status: "",
            message: "",
            open: false
        });
    };

    return (
        <Grid xs={12}>
            <Appbar title="Create register">
                <Paper style={styles.formContainer}>
                    <form onSubmit={onSubmitForm} style={styles.form}>
                        <TextField style={styles.fields} name="concept" label="Concept" onChange={onChangeHandler} value={form.concept} />
                        <TextField style={styles.fields} name="amount" label="Amount" onChange={onChangeHandler} value={form.amount} />
                        <InputLabel style={styles.fields} id="type">Operation</InputLabel>
                        <Select
                            name="type"
                            labelId="type"
                            onChange={onChangeHandler}
                            value={form.type}
                            style={styles.fields}
                        >
                            <MenuItem disabled>Tipo</MenuItem>
                            <MenuItem value={"income"}>Ingreso</MenuItem>
                            <MenuItem value={"outcome"}>Egreso</MenuItem>
                        </Select>
                        <Button fullWidth type="submit" color="primary" variant="contained">Create</Button>
                    </form>
                </Paper>
                {
                    snackAlert.status === "success" ? (
                        <Snackbar
                            open={snackAlert.open}
                            autoHideDuration={6000}
                        >

                            <Alert severity="success">
                                {snackAlert.message}
                            </Alert>
                        </Snackbar>
                    ) : snackAlert.status === "error" ? (
                        <Snackbar
                            open={snackAlert.open}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackAlert}
                        >
                            <Alert severity="error">
                                {snackAlert.message}
                            </Alert>
                        </Snackbar>
                    ) : (
                                null
                            )
                }
            </Appbar>
        </Grid>

    )
}
