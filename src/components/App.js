import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import Signin from './Signin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/">
          <TicketControl />
        </Route>
      </Switch>
    </Router>
  );
}
//under the hood React is actually using a method called React.createElement() to create these elements
//React.Fragment is needed to return multiple elements in a single JSX element (you could use a div too)

export default App;