import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewTicketForm(props){
  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );

  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: v4()})
  }

  //because a function component doesn't have 'this' as a reference like a class component, we need to directly refer to the 'props' passed into the function component. That's why we do props.onNewTicketCreation() instead of this.onNewTicketCreation()

  //onNewTicketCreation() is the callback from the parent component even though it has a different name now - it will run the handleAddingNewTicketToList function from TicketControl
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;