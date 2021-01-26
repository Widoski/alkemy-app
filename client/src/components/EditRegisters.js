import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Paper, TextField, Select, MenuItem, Snackbar, Grid, InputLabel } from '@material-ui/core';
import Appbar from './Appbar';
import axios from "axios";
import conf from '../conf';

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

export default function EditRegisters(props) {
    const { id } = useParams();

    const [updateRegister, setUpdateRegister] = useState({
        concept: "",
        amount: "",
        type: ""
    });


    useEffect(() => {
        axios.get(`${conf.API_URL}/registers/${id}`)
            .then(res => {
                const register = res.data;
                console.log(register)

                setUpdateRegister({
                    ...updateRegister,
                    concept: register.concept,
                    amount: register.amount,
                    type: register.type
                });
            })
            .catch(err => console.log(err))
    }, [])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setUpdateRegister({
            ...updateRegister,
            [name]: value
        });
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        axios.put(`${conf.API_URL}/registers/${id}`, updateRegister)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <Grid>
            <Appbar title="Edit register">
                <Paper style={styles.formContainer}>
                    <form onSubmit={onSubmitForm} style={styles.form}>
                        <TextField style={styles.fields} name="concept" label="Concept" onChange={onChangeHandler} value={updateRegister.concept} />
                        <TextField style={styles.fields} name="amount" label="Amount" onChange={onChangeHandler} value={updateRegister.amount} />
                        <InputLabel style={styles.fields} id="type">Operation</InputLabel>
                        <Select
                            name="type"
                            labelId="type"
                            onChange={onChangeHandler}
                            value={updateRegister.type}
                            style={styles.fields}
                            disabled
                        >
                            <MenuItem disabled>Type</MenuItem>
                            <MenuItem value={"income"}>Income</MenuItem>
                            <MenuItem value={"outcome"}>Outcome</MenuItem>
                        </Select>
                        <Button fullWidth type="submit" color="primary" variant="contained">Create</Button>
                    </form>
                </Paper>
            </Appbar>
        </Grid>
    )
}
