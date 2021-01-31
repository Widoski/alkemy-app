import { useState, useEffect, useContext } from 'react';
import { Button, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paginate from '../Paginate';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import conf from '../../conf';
import axios from 'axios';
import moment from 'moment';
import AppContext from '../../appContext';

const styles = {
   outcomeRow: {
      background: "#ffc1b6"
   },
   headRow: {
      fontWeight: "bold"
   },
   createButton: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      margin: 10
   },
   link: {
      textDecoration: "none",
      color: "white"
   },
   title: {
      fontWeight: "bold",
   },
   table: {
      margin: 20
   }
};

export default function RegistersOutcome({ properties }) {
   const context = useContext(AppContext);

   const [registersOutcome, setRegistersOutcome] = useState([]);
   const [outcomeCount, setOutcomeCount] = useState(0);

   const type = "outcome";
   const limit = 5;
   let offset = 0;

   useEffect(() => {
      fetchRegisters(1);
   }, []);

   const fetchRegisters = (page) => {
      if (page === 1) {
         offset = 0;
      } else {
         offset = limit * (page - 1);
      }
      axios.get(`${conf.API_URL}/registers?limit=${limit}&offset=${offset}&type=${type}`)
         .then(res => {
            setRegistersOutcome(res.data.rows);
            setOutcomeCount(res.data.count);
         });
   };

   const handleEditRegister = id => () => {
      properties.history.push(`/registers/edit/${id}`);
   };

   const handleDeleteRegister = id => () => {
      axios.delete(`${conf.API_URL}/registers/${id}`)
         .then(res => {
            axios.get(`${conf.API_URL}/registers?limit=${limit}&offset=${offset}&type=${type}`)
               .then(res => {
                  setRegistersOutcome(res.data.rows);
                  setOutcomeCount(res.data.count);
                  context.handleSnackbar("success", "Register deleted", true);
               });
         })
         .catch(err => context.handleSnackbar("error", "Cannot delete register", true));
   };

   return (
      <Grid container>
         <TableContainer component={Paper} style={styles.table}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell style={styles.headRow}>Concept</TableCell>
                     <TableCell style={styles.headRow}>Date</TableCell>
                     <TableCell style={styles.headRow}>Amount</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {
                     registersOutcome.length ? (
                        registersOutcome.map(r => (
                           <TableRow key={r.id} style={styles.outcomeRow}>
                              <TableCell>{r.concept}</TableCell>
                              <TableCell>{moment(r.createdAt).format("l")}</TableCell>
                              <TableCell>{`$${r.amount}`}</TableCell>
                              <TableCell>
                                 <Button onClick={handleEditRegister(r.id)} color="secondary">
                                    <EditIcon />
                                 </Button>
                                 <Button onClick={handleDeleteRegister(r.id)} color="secondary">
                                    <DeleteIcon />
                                 </Button>
                              </TableCell>
                           </TableRow>
                        ))
                     ) : null
                  }
               </TableBody>
            </Table>
            <Paginate count={outcomeCount} limit={limit} fetchRegisters={fetchRegisters} />
         </TableContainer>
         <div style={styles.createButton}>
            <Button variant="contained" color="primary">
               <Link style={styles.link} to="/registers/create">Create</Link>
            </Button>
         </div>
      </Grid >
   );
};
