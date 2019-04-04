import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./index.css";
import ListTodos from "./listTodo";
import Notfound from "./notfound";
import Navigation from "./navigation";
import EditTodo from "./edit";
import AddTodo from "./add";

const App = () => {
  const textAlign = {
    textAlign: "center"
  };
  return (
    <div>
      <h1 style={textAlign}>TO DO APPLICATION</h1>
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/edit/:id" component={EditTodo} />
            <Route path="/add" component={AddTodo} />
            <Route path="/" component={ListTodos} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
export default App;
