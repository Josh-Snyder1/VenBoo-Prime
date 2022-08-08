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


// Component that shows the header of the host
export default function Header({ event, toggleEdit }) {

  console.log(event,"????")

  // Get the event ID from the URL parameters
  const { eventId } = useParams();
  // Initialize the dispatch function
  const dispatch = useDispatch();

  // REDUX STORE
  const events = useSelector((store) => store.events);
  // const event = useSelector(store => store.eventsContainer.currentEvent)
  const boothApplications = useSelector((store) => store.boothApplications);
  const user = useSelector((store) => store.user);

  // useEffect(() => {
  //   dispatch({ type: "FETCH_CURRENT_EVENT", payload: {eventId} });
  // }, []);


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
          // details: eventDetails
          details: event
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