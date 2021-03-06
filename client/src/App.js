import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, Snackbar } from '@material-ui/core';
import theme from './theme';
import Home from './components/Home';
import RegistersTab from './components/Registers/RegistersTab';
import CreateRegister from './components/Registers/CreateRegister';
import EditRegisters from './components/Registers/EditRegisters';
import CreateCategories from './components/Categories/CreateCategory';
import Categories from './components/Categories/Categories';
import EditCategories from './components/Categories/EditCategories';
import MuiAlert from '@material-ui/lab/Alert';
import AppContext from './appContext';

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
   const [snackAlert, setSnackAlert] = useState({
      status: "",
      alert: "",
      message: "",
      open: false
   });

   const handleSnackbar = (status, message, boolean) => {
      setSnackAlert({
         ...snackAlert,
         status,
         message,
         open: boolean
      });
   };

   const handleCloseSnackbar = () => {
      setSnackAlert({
         ...snackAlert,
         status: "",
         message: "",
         open: false
      });
   };

   return (
      <ThemeProvider theme={theme}>
         <AppContext.Provider value={{
            handleSnackbar,
         }}>
            <div style={{ background: "#f4f4f4" }}>
               <Router>
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <Route exact path="/registers" component={RegistersTab} />
                     <Route exact path="/registers/edit/:id" component={EditRegisters} />
                     <Route exact path="/registers/create" component={CreateRegister} />
                     <Route exact path="/categories" component={Categories} />
                     <Route exact path="/categories/edit/:id" component={EditCategories} />
                     <Route exact path="/categories/create" component={CreateCategories} />
                  </Switch>
               </Router>
            </div>
            {
               snackAlert.status === "success" ? (
                  <Snackbar
                     open={snackAlert.open}
                     autoHideDuration={3000}
                     onClose={handleCloseSnackbar}
                  >

                     <Alert severity="success">
                        {snackAlert.message}
                     </Alert>
                  </Snackbar>
               ) : snackAlert.status === "error" ? (
                  <Snackbar
                     open={snackAlert.open}
                     autoHideDuration={3000}
                     onClose={handleCloseSnackbar}
                  >
                     <Alert severity="error">
                        {snackAlert.message}
                     </Alert>
                  </Snackbar>
               ) : null
            }
         </AppContext.Provider>
      </ThemeProvider>
   );
};

export default App;
