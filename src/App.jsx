import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./index.css";
import Notes from "./notes";
import Notfound from "./notfound";
import Navigation from "./navigation";

const App = () => (
  <div>
    <h1>TO DO APPLICATION</h1>
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/notes" component={Notes} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  </div>
);
export default App;
