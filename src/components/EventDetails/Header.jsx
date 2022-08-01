import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

function Header() {
  const { eventId } = useParams();
  const events = useSelector((store) => store.events);
  const booths = useSelector((store) => store.boothApplications);
  const user = useSelector((store) => store.user);
  let Pending = 0;
  let Approved = 0;
  let Available = 0;
  let total = 0;

  let eventDetails = events.filter((event) => {
    if (event.id === Number(eventId)) {
      return event;
    }
  });
  eventDetails = eventDetails.pop();

  for (const booth of booths) {
    // Checks to see if the booth is approved and If it belongs to the current user
    // Renders total Approved and total Pending booths quantity

    if (Number(eventId) === booth.event_id) {
      if (booth.approved_by_host === false) {
        Pending += booth.quantity;
      }
      if (booth.approved_by_host === true) {
        Approved += booth.quantity;
      }
    }
    total = Pending + Approved;
    Available = total - Approved;
  }

  console.log(
    "is eventDetails defined >>>>>>>>",
    eventDetails?.address[0].address
  );
  const address = eventDetails?.address[0];

  switch (user.type) {
    case "host":
      return (
        <>
          {eventDetails && (
            <ul>
              <h2> {eventDetails.name} </h2>
              <br />
              <div className="eventAddress">
                {moment(eventDetails.start_date).format("MMMM Do")} -{" "}
                {moment(eventDetails.end_date).format("MMMM Do YYYY")}
                <br />
                {address.address},&nbsp;{address.city},&nbsp;{address.state}
                &nbsp;
                {address.zipcode}
              </div>
              <br />
              Total Approved Booths: {Approved}
              <br />
              Pending Booths: {Pending}
              <br />
              Avalible: {Available}
              <br />
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
              Avalible booths: {Available}
            </ul>
          )}
        </>
      );
    default:
      return <></>;
  }
}

export default Header;
