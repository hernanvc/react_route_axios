import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  IndexForm  from './components/formulario/Index';
import Solicitudes from './components/formulario/Solicitudes';

//styles
import './assets/css/fonts.css';
import './assets/css/bootstrap.min.css';
import './assets/css/animate.css';
import './assets/css/main.css';
import './assets/css/responsive.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/*<Route exact path="/" component={Landing} />*/}
          <Route exact path="/lab/eazyroof_react/form/" component={Solicitudes} />
          <Route path="/lab/eazyroof_react/form/solicitudes/:handle" component={IndexForm} />
        </Switch>
    </Router> 
    );
  }
}

export default App;