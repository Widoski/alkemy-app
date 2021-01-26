import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Home from './components/Home';
import Registers from './components/Registers';
import CreateRegister from './components/CreateRegister';
import EditRegisters from './components/EditRegisters';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ background: "#f4f4f4" }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/registers" component={Registers} />
            <Route exact path="/registers/edit/:id" component={EditRegisters} />
            <Route exact path="/registers/create" component={CreateRegister} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
