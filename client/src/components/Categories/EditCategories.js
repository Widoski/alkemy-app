import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Paper, TextField, Grid } from '@material-ui/core';
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

export default function EditCategories(props) {
    const context = useContext(AppContext);

    const { id } = useParams();

    const [edit, setEdit] = useState({
        name: ""
    });

    useEffect(() => {
        axios.get(`${conf.API_URL}/categories/${id}`)
            .then(res => {
                const category = res.data;

                setEdit({
                    ...edit,
                    name: category.name
                });
            })
            .catch(err => console.log(err))
    }, [])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setEdit({
            ...edit,
            [name]: value
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        axios.put(`${conf.API_URL}/categories/${id}`, edit)
            .then(res => {
                context.handleSnackbar("success", "Category edited", true);
                props.history.push("/categories");
            })
            .catch(err => context.handleSnackbar("error", "Cannot edit category", true));
    };

    return (
        <Grid>
            <Appbar title="Edit register">
                <Paper style={styles.formContainer}>
                    <form onSubmit={onSubmitForm} style={styles.form}>
                        <TextField style={styles.fields} name="name" label="Name" onChange={onChangeHandler} value={edit.name} />
                        <Button fullWidth type="submit" color="primary" variant="contained">Edit</Button>
                    </form>
                </Paper>
            </Appbar>
        </Grid>
    );
};
