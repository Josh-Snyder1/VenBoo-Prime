import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

function Header() {
  const { eventId } = useParams();
  const events = useSelector((store) => store.events);
  const booths = useSelector((store) => store.boothApplications);
  const user = useSelector((store) => store.user);
  console.log(booths);

  //   if (booths.approved_by_host === true) {
  //     console.log("WHIPPI ITS TRUE");
  //   }

  return events.map((event) => {
    if (event.id === Number(eventId)) {
      return (
        <ul>
          {event.name}
          <br />
          {moment(event.start_date).format("MMMM Do")} -{" "}
          {moment(event.end_date).format("MMMM Do YYYY")}
          <br />
        </ul>
      );
    }
    return booths.map((booth) => {
      // checks to see if the booth is approved and If it belongs to the current user
      // If true then renders the Quantity of approved booths
      if (booth.approved_by_host === true && user.id === booth.vendor_id) {
        return (
          <ul key={booth.booth_id}>
            <li> Approved booths: {booth.quantity} </li>
          </ul>
        );
      }
      if (booth.approved_by_host === false) {
        return <h2>Remaining booths: {booth.quantity}</h2>;
      }
    });
  });
}

export default Header;
