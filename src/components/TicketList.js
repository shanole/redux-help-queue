import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';


function TicketList(props){

  // from react-redux-firebase - listens to changes in firestore w/o using a HOC
  // you can also use this hook to find a ticket w/ a specific id:
  // useFirestoreConnect([
  //   { collection: 'tickets',
  //     doc: ticketId }
  // ]);
  
  useFirestoreConnect([
    { collection: 'tickets' }
  ])

  // from react-redux - allows us to extract data from a redux store
  const tickets = useSelector(state => state.firestore.ordered.tickets);

  // check that the ticket collections has loaded BEFORE rendering the component!
  if (isLoaded(tickets)) {
    return(
      <React.Fragment>
        <hr/>
        {tickets.map((ticket) => {
          return <Ticket 
          whenTicketClicked = {props.onTicketSelection}
          names={ticket.names}
          location = {ticket.location}
          issue = {ticket.issue}
          formattedWaitTime = {ticket.formattedWaitTime}
          id={ticket.id}
          key = {ticket.id} />
        })}
      </React.Fragment>
    )
  } else {
    return(
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

TicketList.propTypes = {
  // ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
}

export default TicketList;