import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./Index.css";
import ListTodos from "./ListTodo";
import Notfound from "./NotFound";
import Navigation from "./Navigation";
import EditTodo from "./Edit";
import AddTodo from "./Add";
// import Icon from "antd/lib/icon";
// import Spin from "antd/lib/spin";

// Spin.setDefaultIndicator(
//   <Icon size="large" style={{ fontSize: "36px" }} type="loading" />
// );

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
