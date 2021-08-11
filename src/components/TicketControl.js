import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

handleEditingTicketInList = (ticketToEdit) => {
  const editedMasterTicketList = this.state.masterTicketList
        .filter(ticket => ticket.id !== this.state.selectedTicket.id)
        .concat(ticketToEdit);
  this.setState({
    masterTicketList: editedMasterTicketList,
    editing: false,
    selectedTicket: null
  });
}

handleEditClick = () => {
  console.log("handleEditClick reached");
  this.setState({editing: true});
}

handleDeletingTicket = (id) => {
  const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id); //we want to filter everything that doesn't have the ticket ID that will be passed into the method
  this.setState({
    masterTicketList: newMasterTicketList,
    selectedTicket: null
  })
}

handleChangingSelectedTicket = (id) => {
  const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0]; // filter returns an array so we need to specify that we want the first element in that array
  this.setState({selectedTicket: selectedTicket}); //we use setState method to mutate the state of the selectedTicket state slice
}

  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({masterTicketList: newMasterTicketList,
                  formVisibleOnPage: false });

  }


  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
        this.setState(prevState => ({
          formVisibleOnPage: !prevState.formVisibleOnPage // we pass in the current state of the formVisibleOnPage boolean to prevState. now that we know this value, we can say the new state should be the opposite of the old state
      }));
    }
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket}
      onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket}                onClickingDelete = {this.handleDeletingTicket} 
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation = {this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />; //because a uswer will actually be clicking on the ticket in the Ticket component, we will pass the handleChangingSelectedTicket method as a prop 
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

export default TicketControl;