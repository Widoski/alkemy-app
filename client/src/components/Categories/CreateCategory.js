import { useState, useContext } from 'react';
import { Grid, TextField, Button, Paper } from '@material-ui/core';
import conf from '../../conf';
import axios from 'axios';
import AppContext from '../../appContext';
import Appbar from '../Appbar';

const styles = {
   formContainer: {
      margin: 20,
   },
   form: {
      display: "flex",
      flexDirection: "column",
   },
   fields: {
      margin: 10
   },
   createButton: {
      display: "flex",
      justifyContent: "flex-end",
      margin: 10
   },
};

export default function CreateCategory() {
   const context = useContext(AppContext);

   const [newCategory, setNewCategory] = useState({
      name: ""
   });

   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      console.log(name, value)
      setNewCategory({
         ...newCategory,
         [name]: value
      });
   };

   const onSubmitForm = (e) => {
      e.preventDefault();
      console.log(newCategory)

      axios.post(`${conf.API_URL}/categories`, newCategory)
         .then(res => {
            context.handleSnackbar("success", "New category created", true);
            console.log(res.data)
         })
         .catch(err => context.handleSnackbar("error", "Cannot create category", true));
   };

   return (
      <Appbar title="Create category">
         <Grid component={Paper} style={styles.formContainer}>
            <form onSubmit={onSubmitForm} style={styles.form}>
               <TextField style={styles.fields} name="name" label="Name" onChange={onChangeHandler} value={newCategory.name} />
               <Button fullWidth type="submit" variant="contained" color="primary">Create</Button>
            </form>
         </Grid>
      </Appbar >
   )
}
