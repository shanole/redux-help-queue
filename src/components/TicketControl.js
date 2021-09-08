import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

handleEditingTicketInList = (ticketToEdit) => {
  this.setState({
    editing: false,
    selectedTicket: null
  });
}

handleEditClick = () => {
  console.log("handleEditClick reached");
  this.setState({editing: true});
}

handleDeletingTicket = (id) => {
  this.props.firestore.delete({collection: 'tickets', doc: id})
  this.setState({selectedTicket: null});
}

handleChangingSelectedTicket = (id) => {
  this.props.firestore.get({collection: 'tickets', doc: id}).then((ticket) => {
    const firestoreTicket = {
      names: ticket.get("names"),
      location: ticket.get("location"),
      issue: ticket.get("issue"),
      id: ticket.id
      }
      this.setState({selectedTicket: firestoreTicket})
  });
}

handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  render(){
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return(
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return(
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      let currentlyVisibleState = null;
      let buttonText = null;
  
      if (this.state.editing) {
        currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket}
        onEditTicket = {this.handleEditingTicketInList} />
        buttonText = "Return to Ticket List";
      } else if (this.state.selectedTicket != null) {
        currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick} />
        buttonText = "Return to Ticket List";
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation = {this.handleAddingNewTicketToList} />;
        buttonText = "Return to Ticket List";
      } else {
        currentlyVisibleState = <TicketList onTicketSelection={this.handleChangingSelectedTicket} />; //because a user will actually be clicking on the ticket in the Ticket component, we will pass the handleChangingSelectedTicket method as a prop 
        buttonText = "Add Ticket";
      }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    }
  }
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl); //now our new TicketControl has state props and access to dispatch by way of connect()

// HOC that makes firestore available to our app with this.props.firestore
export default withFirestore(TicketControl);