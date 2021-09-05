import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      // masterTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(), 60000
    );
  }

  componentDidUpdate() {
    console.log("Component updated!");
  }

  componentWillUnmount() {
    console.log("Component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    console.log("tick");
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    })
  }



handleEditingTicketInList = (ticketToEdit) => {
  const { dispatch } = this.props;
  const action = a.addTicket(ticketToEdit)
  dispatch(action);
  this.setState({
    editing: false,
    selectedTicket: null
  });
  // const editedMasterTicketList = this.state.masterTicketList
  //       .filter(ticket => ticket.id !== this.state.selectedTicket.id)
  //       .concat(ticketToEdit);
  // this.setState({
  //   masterTicketList: editedMasterTicketList,
  //   editing: false,
  //   selectedTicket: null
  // });
}

handleEditClick = () => {
  console.log("handleEditClick reached");
  this.setState({editing: true});
}

handleDeletingTicket = (id) => {
  const { dispatch } = this.props;
  const action = a.deleteTicket(id);
  dispatch(action);
  this.setState({selectedTicket: null});
  // const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id); //we want to filter everything that doesn't have the ticket ID that will be passed into the method
  // this.setState({
  //   masterTicketList: newMasterTicketList,
  //   selectedTicket: null
  // })
}

handleChangingSelectedTicket = (id) => {
  const selectedTicket = this.props.masterTicketList[id];
  this.setState({selectedTicket: selectedTicket}); 
}

handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2)
    // this.setState({formVisibleOnPage: false})

    // const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    // this.setState({masterTicketList: newMasterTicketList,
    //               formVisibleOnPage: false });
  }


  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
      //   this.setState(prevState => ({
      //     formVisibleOnPage: !prevState.formVisibleOnPage // we pass in the current state of the formVisibleOnPage boolean to prevState. now that we know this value, we can say the new state should be the opposite of the old state
      // }));
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
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} 
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation = {this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />; //because a user will actually be clicking on the ticket in the Ticket component, we will pass the handleChangingSelectedTicket method as a prop 
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

export default TicketControl;