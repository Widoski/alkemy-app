import { useState, useEffect, useContext } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Appbar from '../Appbar';
import conf from '../../conf';
import axios from 'axios';
import AppContext from '../../appContext';

const styles = {
   containerTable: {
      margin: 10
   },
   headRow: {
      fontWeight: "bold"
   },
   createButton: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
      margin: 10,
   },
   link: {
      textDecoration: "none"
   }
}

export default function Categories(props) {
   const context = useContext(AppContext);

   const [categories, setCategories] = useState([]);

   useEffect(() => {
      axios.get(`${conf.API_URL}/categories`)
         .then(res => {
            setCategories(res.data);
         });
   }, []);

   const handleEditCategory = id => () => {
      props.history.push(`/categories/edit/${id}`);
   };

   const handleDeleteCategory = id => () => {
      axios.delete(`${conf.API_URL}/categories/${id}`)
         .then(res => {
            axios.get(`${conf.API_URL}/categories`)
               .then(res => {
                  context.handleSnackbar("success", "Category deleted", true);
                  setCategories(res.data);
               });
         })
         .catch(err => console.log(err));
   };

   return (
      <Appbar title="Categories">
         <Grid container>
            <TableContainer component={Paper} style={styles.containerTable}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell style={styles.headRow}>Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {
                        categories.length ? (
                           categories.map(category => (
                              <TableRow key={category.id}>
                                 <TableCell>{category.name}</TableCell>
                                 <TableCell>
                                    <Button onClick={handleEditCategory(category.id)} color="secondary">
                                       <EditIcon />
                                    </Button>
                                    <Button onClick={handleDeleteCategory(category.id)} color="secondary">
                                       <DeleteIcon />
                                    </Button>
                                 </TableCell>
                              </TableRow>))
                        ) : null
                     }
                  </TableBody>
               </Table>
            </TableContainer>
            <div style={styles.createButton}>
               <Link style={styles.link} to="categories/create"><Button variant="contained" color="primary">Create</Button></Link>
            </div>
         </Grid>
      </Appbar >
   );
};
