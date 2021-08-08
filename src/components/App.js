import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";

function App() {
  return (
  <React.Fragment>
    <Header />
    <TicketControl />
    {/* This is a JSX comment. */}
  </React.Fragment>
  );
}
//under the hood React is actually using a method called React.createElement() to create these elements
//React.Fragment is needed to return multiple elements in a single JSX element (you could use a div too)

export default App;