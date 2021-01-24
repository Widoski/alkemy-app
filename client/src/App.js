import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Registers from './components/Registers';
import CreateRegister from './components/CreateRegister';

function App() {
  return (
    <div style={{ background: "#f4f4f4" }}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/registers" component={Registers} />
        <Route exact path="/registers/create" component={CreateRegister} />
      </Router>
    </div>
  );
}

export default App;
