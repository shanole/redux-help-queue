import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { userFirestore } from 'react-redux-firebase';

function NewTicketForm(props){

  const firestore = useFirestore();

  function addTickettoFirestore(event) {
    event.preventDefault();

    // this is still needed to toggle between components but no longer handles creating the actual ticket
    props.onNewTicketCreation();

    return firestore.collection('tickets').add(
      {
        names: event.target.names.value,
        location: event.target.location.value, 
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }
  
  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={addTickettoFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );


  //because a function component doesn't have 'this' as a reference like a class component, we need to directly refer to the 'props' passed into the function component. That's why we do props.onNewTicketCreation() instead of this.onNewTicketCreation()

  //onNewTicketCreation() is the callback from the parent component even though it has a different name now - it will run the handleAddingNewTicketToList function from TicketControl
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;