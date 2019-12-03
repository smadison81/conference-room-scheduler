import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import Conf from "./Pages/Conf";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/conf" component={Conf} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
