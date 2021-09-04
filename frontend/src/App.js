import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Call from './pages/Call';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/main.scss';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/meet/:id" component={Call} />
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;
