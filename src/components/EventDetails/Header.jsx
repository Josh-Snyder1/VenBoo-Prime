import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import VerificationComponent from '../ReuseableComponents/VerificationComponent'

// Import the used components
import Address from "../Contacts/Address";
import AvailableBooths from "../EventsList/EventListComponents/AvailableBooths";
import DisplayTags from "../Tags/DisplayTags";


function Header({ toggleEdit }) {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  // REDUX STORE
  const events = useSelector((store) => store.events);
  const event = useSelector(store => store.eventsContainer.currentEvent)
  const boothApplications = useSelector((store) => store.boothApplications);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);

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

  // for (const booth of eventDetails.booths) {
  //   total = total + booth.quantity;
  // }
  console.log("BOOTHS ARE BOOOO>>", eventDetails);
  console.log(">>>>>", event)
  for (const booth of eventDetails.booths) {
    total = total + booth.quantity;
  }
  for (const booth of boothApplications) {
    // Checks to see if the booth is approved and If it belongs to the current user
    // Renders total Approved and total Pending booths quantity

    if (Number(eventId) === booth.event_id) {
      if (booth.approved_by_host === "PENDING") {
        Pending += booth.quantity;
      }
      if (booth.approved_by_host === "APPROVED") {
        Approved += booth.quantity;
      }
    }
    // total = Pending + Approved;
    // Available = total - Approved;
  }
  Available = total - Approved;
  console.log(total);
  // total = totalbooth.quantity;
  // const booths = eventDetails.booths;

  // total = total;

  const address = eventDetails?.address[0];

  const selectedTags = eventDetails?.tags;

  return (
    <>
      <div className="pageEdit">
        <EditIcon
          sx={{
            cursor: "pointer",
            marginRight: "5px",
            position: "absolute",
            display: "flex",
          }}
          onClick={() => {
            toggleEdit();
          }}
        />
      </div>

      <div className="header-container">
        <VerificationComponent
        props={{
          view: 'page',
          type: 'event',
          details: eventDetails
          }} 
        />
        <h2>{event.name}</h2>
        <p className="event-date-range">{`${moment(event.start_date).format("MMM Do YYYY")} - ${moment(event.end_date).format("MMM Do YYYY")}`}</p>

        <div className="event-detail-container">
          <div className="venue-card">

            <p className="venue-name">{event.venue_name}</p>
            <div className="venue-address-block">
              <Address
                address={event.venue_address}
                address_2={event.venue_address_2}
                city={event.venue_city}
                state={event.venue_state}
                zipcode={event.venue_zipcode}
              />
            </div>

          </div>

          <div className="event-booth-stats">
            <AvailableBooths event={event} />
          </div>

        </div>

        <div className="event-booth-tags">
          <DisplayTags tags={event.tags} />
        </div>


      </div>
    </>
  );
}

export default Header;
