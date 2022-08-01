import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

function Header() {
  let Pending = 0;
  let Approved = 0;
  const { eventId } = useParams();
  const events = useSelector((store) => store.events);
  const booths = useSelector((store) => store.boothApplications);
  const user = useSelector((store) => store.user);

  let eventDetails = events.filter((event) => {
    if (event.id === Number(eventId)) {
      return event;
    }
  });
  eventDetails = eventDetails.pop();

  for (const booth of booths) {
    // Checks to see if the booth is approved and If it belongs to the current user
    // Renders total Approved and total Pending booths quantity
    if (user.id === booth.vendor_id) {
      if (booth.approved_by_host === "PENDING") {
        Pending += booth.quantity;
      }
      if (booth.approved_by_host === "APPROVED") {
        Approved += booth.quantity;
      }
    }
  }
  switch (user.type) {
    case "host":
      return (
        <>
          {eventDetails && (
            <ul>
              <h2> {eventDetails.name} </h2>
              <br />
              {moment(eventDetails.start_date).format("MMMM Do")} -{" "}
              {moment(eventDetails.end_date).format("MMMM Do YYYY")}
              <br />
              Total Approved Booths: {Approved}
              <br />
              Pending Booths: {Pending}
            </ul>
          )}
        </>
      );
    case "vendor":
      return (
        <>
          {eventDetails && (
            <ul>
              <h2> {eventDetails.name} </h2>
              <br />
              {moment(eventDetails.start_date).format("MMMM Do")} -{" "}
              {moment(eventDetails.end_date).format("MMMM Do YYYY")}
              <br />
              Avalible booths:
            </ul>
          )}
        </>
      );
    default:
      return <></>;
  }
}

export default Header;
