import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Paper, TextField, Select, MenuItem, Grid, InputLabel } from '@material-ui/core';
import Appbar from '../Appbar';
import axios from "axios";
import conf from '../../conf';
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

export default function EditRegisters(props) {
    const context = useContext(AppContext);

    const { id } = useParams();

    const [edit, setEdit] = useState({
        concept: "",
        amount: "",
        type: ""
    });

    useEffect(() => {
        axios.get(`${conf.API_URL}/registers/${id}`)
            .then(res => {
                const register = res.data;

                setEdit({
                    ...edit,
                    concept: register.concept,
                    amount: register.amount,
                    type: register.type
                });
            })
            .catch(err => console.log(err))
    }, []);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setEdit({
            ...edit,
            [name]: value
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        axios.put(`${conf.API_URL}/registers/${id}`, edit)
            .then(res => {
                context.handleSnackbar("success", "Register edited", true);
                props.history.push("/registers")
            })
            .catch(err => context.handleSnackbar("error", "Cannot edit register", true));
    };

    return (
        <Grid>
            <Appbar title="Edit register">
                <Paper style={styles.formContainer}>
                    <form onSubmit={onSubmitForm} style={styles.form}>
                        <TextField style={styles.fields} name="concept" label="Concept" onChange={onChangeHandler} value={edit.concept} />
                        <TextField style={styles.fields} name="amount" label="Amount" onChange={onChangeHandler} value={edit.amount} />
                        <InputLabel style={styles.fields} id="type">Operation</InputLabel>
                        <Select
                            name="type"
                            labelId="type"
                            onChange={onChangeHandler}
                            value={edit.type}
                            style={styles.fields}
                            disabled
                        >
                            <MenuItem disabled>Type</MenuItem>
                            <MenuItem value={"income"}>Income</MenuItem>
                            <MenuItem value={"outcome"}>Outcome</MenuItem>
                        </Select>
                        <Button fullWidth type="submit" color="primary" variant="contained">Edit</Button>
                    </form>
                </Paper>
            </Appbar>
        </Grid>
    );
};
