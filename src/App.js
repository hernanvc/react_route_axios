import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  IndexForm  from './components/formulario/Index';
import Solicitudes from './components/formulario/Solicitudes';
import Login from './components/auth/Index';
import Finished from './components/Finished';
import DetailFinished from './components/Finished/detail';

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
          <Route exact path="/lab/eazyroof_react/form/" component={Login} />
          <Route exact path="/lab/eazyroof_react/form/solicitudes" component={Solicitudes} />
          <Route path="/lab/eazyroof_react/form/solicitudes/:handle" component={IndexForm} />
          <Route exact path="/lab/eazyroof_react/form/complete" component={Finished} />
          <Route exact path="/lab/eazyroof_react/form/complete/detail=:handle" component={DetailFinished} />
        </Switch>
    </Router> 
    );
  }
}

export default App;