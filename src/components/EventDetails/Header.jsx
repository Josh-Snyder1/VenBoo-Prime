// Import the used libraries and functions
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Import the used components
import Address from "../Contacts/Address";
import AvailableBooths from "../EventsList/EventListComponents/AvailableBooths";
import DisplayTags from "../Tags/DisplayTags";
import VenueContact from "./VenueContact";
import VerificationComponent from '../ReuseableComponents/VerificationComponent'


export default function Header({ toggleEdit, eventDetails }) {
  const { eventId } = useParams();
  // Initialize the dispatch function
  const dispatch = useDispatch();

  // REDUX STORE
  const events = useSelector((store) => store.events);
  const event = useSelector(store => store.eventsContainer.currentEvent)
  const boothApplications = useSelector((store) => store.boothApplications);
  const user = useSelector((store) => store.user);

  console.log('in header', eventDetails)
  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_EVENT", payload: {eventId} });
  }, []);

  let Pending = 0;
  let Approved = 0;
  let Available = 0;
  let total = 0;

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
  }

  Available = total - Approved;

  const address = eventDetails?.address[0];

  const selectedTags = eventDetails?.tags;

  return (
    <>
      <div className="pageEdit">
        <EditIcon
          sx={{
            cursor: "pointer",
            marginRight: "5em",
            position: "absolute",
            display: "flex"
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
          details: eventDetails,
          }} 
        />
        <h2>{eventDetails.name}</h2>
        <p className="event-date-range">{`${moment(eventDetails.start_date).format("MMM Do YYYY")} - ${moment(eventDetails.end_date).format("MMM Do YYYY")}`}</p>

        <div className="event-detail-container">
          <div className="venue-card">

            <p className="venue-name">{eventDetails.venue_name}</p>
            <div className="venue-address-block">
              <Address
                address={eventDetails.address[0].address}
                address_2={eventDetails.address[0].address_2}
                city={eventDetails.address[0].city}
                state={eventDetails.address[0].state}
                zipcode={eventDetails.address[0].zipcode}
              />
            </div>

          </div>

          {user.type !== 'vendor' ?
            <VenueContact
              contactPerson={event.venue_contact_person}
              contactEmail={event.venue_contact_email}
              contactPhone={event.venue_contact_phone_number}
              contactWebsite={event.venue_contact_website}
            />
            :
            null
          }

          <div className="event-booth-stats">
            <AvailableBooths event={event} />
          </div>

        </div>

        <div className="event-booth-tags">
          {event?.tags && <DisplayTags tags={event.tags} />}
        </div>


      </div>
    </>
  );
}