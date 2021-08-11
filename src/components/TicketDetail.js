import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props){
  const { ticket } = props;  //here we mix it up and use object destrucuting to derive the ticket object from our props. so below we use ticket.location instead of props.ticket.location, for example

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object

}
export default TicketDetail;