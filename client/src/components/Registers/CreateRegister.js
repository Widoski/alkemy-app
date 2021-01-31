import React, { useState, useContext, useEffect } from 'react';
import { Button, Paper, TextField, Select, MenuItem, Grid, InputLabel } from '@material-ui/core';
import Appbar from '../Appbar';
import conf from '../../conf';
import axios from 'axios';
import AppContext from '../../appContext';

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
};

export default function Registers() {
    const context = useContext(AppContext);

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        concept: "",
        amount: "",
        type: "",
        CategoryId: null
    });

    useEffect(() => {
        axios.get(`${conf.API_URL}/categories`)
            .then(res => {
                setCategories(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        setForm({
            ...form,
            [name]: value
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        axios.post(`${conf.API_URL}/registers`, form)
            .then(res => {
                console.log(res.data);
                context.handleSnackbar("success", "Register created", true);
            })
            .catch(err => context.handleSnackbar("error", "Cannot create register", true));
    };

    return (
        <Grid>
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
                            <MenuItem value={"income"}>Income</MenuItem>
                            <MenuItem value={"outcome"}>Outcome</MenuItem>
                        </Select>
                        {
                            form.type === "outcome" ? (
                                <>
                                    <InputLabel style={styles.fields} id="CategoryId">Category</InputLabel>
                                    <Select
                                        name="CategoryId"
                                        labelId="CategoryId"
                                        onChange={onChangeHandler}
                                        value={form.CategoryId}
                                        style={styles.fields}
                                    >
                                        <MenuItem disabled>Category</MenuItem>
                                        {
                                            categories.map(category => (
                                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </>
                            ) : null
                        }
                        <Button fullWidth type="submit" color="primary" variant="contained">Create</Button>
                    </form>
                </Paper>
            </Appbar>
        </Grid>
    );
};
