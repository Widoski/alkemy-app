import { useState, useEffect, useContext } from 'react';
import { Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, Typography, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paginate from './Paginate';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Appbar from './Appbar';
import conf from '../conf';
import axios from 'axios';
import moment from 'moment';
import AppContext from '../appContext';

const styles = {
   incomeRow: {
      background: "#a0c1b8"
   },
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
   startBox: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      width: "100%",

   }
}

export default function Registers(props) {
   const context = useContext(AppContext);

   const [registers, setRegisters] = useState([]);
   const [count, setCount] = useState(0);
   const page = 1;

   const limit = 10;
   let offset = 0;

   useEffect(() => {
      fetchRegisters(1);
   }, []);

   const fetchRegisters = page => {
      if (page == 1) {
         offset = 0;
      } else {
         offset = limit * (page - 1);
      }
      axios.get(`${conf.API_URL}/registers?limit=${limit}&offset=${offset}`)
         .then(res => {
            setRegisters(res.data.rows);
            setCount(res.data.count);
         });
   }

   const handleEditRegister = id => () => {
      props.history.push(`/registers/edit/${id}`);
   }

   const handleDeleteRegister = id => () => {
      axios.delete(`${conf.API_URL}/registers/${id}`)
         .then(res => {
            context.handleSnackbar("success", "Registro eliminado", true)
            fetchRegisters(1);
         })
         .catch(err => context.handleSnackbar("error", "No se pudo eliminar el registro", true));
   }

   return (
      <Grid container>
         <Appbar title="My Registers">
            {
               registers.length ? (
                  <>
                     <Grid item xs>
                        <Table>
                           <TableHead>
                              <Toolbar>
                                 <Typography variant="h6" style={styles.title}>INGRESOS</Typography>
                              </Toolbar>
                              <TableRow>
                                 <TableCell style={styles.headRow}>Concept</TableCell>
                                 <TableCell style={styles.headRow}>Date</TableCell>
                                 <TableCell style={styles.headRow}>Amount</TableCell>
                                 <TableCell></TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {
                                 registers.map(r => (
                                    r.type === "income" ? (
                                       <TableRow style={styles.incomeRow} key={r.id}>
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
                                    ) : null
                                 ))
                              }
                           </TableBody>
                        </Table>
                     </Grid>
                     <Grid item xs>
                        <Table>
                           <TableHead>
                              <Toolbar>
                                 <Typography variant="h6" style={styles.title}>EGRESOS</Typography>
                              </Toolbar>
                              <TableRow>
                                 <TableCell style={styles.headRow}>Concept</TableCell>
                                 <TableCell style={styles.headRow}>Type</TableCell>
                                 <TableCell style={styles.headRow}>Amount</TableCell>
                                 <TableCell></TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {
                                 registers.map(r => (
                                    r.type === "outcome" ? (
                                       <TableRow style={styles.outcomeRow} key={r.id}>
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
                                    ) : null
                                 ))
                              }
                           </TableBody>
                           <Paginate numberOfRegisters={count} registersPerPage={limit} page={page} fetchRegisters={fetchRegisters} />
                        </Table>
                     </Grid>
                     <div style={styles.createButton}>
                        <Button variant="contained" color="primary">
                           <Link style={styles.link} to="/registers/create">Create</Link>
                        </Button>
                     </div>
                  </>
               ) : (
                     <Grid xs>
                        <div style={styles.startBox}>
                           <h2>No registers created</h2>
                           <div style={{ margin: 10 }}>
                              <Button variant="contained" color="primary">
                                 <Link style={styles.link} to="/registers/create">Start</Link>
                              </Button>
                           </div>
                        </div>
                     </Grid>
                  )
            }
         </Appbar>
      </Grid >
   )
}
