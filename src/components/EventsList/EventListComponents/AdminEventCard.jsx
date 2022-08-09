// Import the core libraries and functions
import moment from "moment"
import { useHistory } from "react-router-dom"

// Import the MUI styling elements
import { Card } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';

// Import the used components
import Address from "../../Contacts/Address"
import AvailableBooths from "./AvailableBooths"
import DisplayTags from "../../Tags/DisplayTags"
import VerificationComponent from "../../ReuseableComponents/VerificationComponent";


// Component that handles the display of an admin event
// to the DOM
export default function AdminEventCard({ event }) {

  // Initialize the useHistory() function
  const history = useHistory()


  // ---------------------------------------
  // Display the DOM elements
  return (
    <Card
      className="event-card"
      onClick={() => history.push(`/event/${event.id}`)}
      key={event.id}
      elevation={4}
      sx={{
        padding: "1em",
        margin: '1em',
        width: '80%'
      }}
    >

      <p className="event-date-range"><span>{moment(event.start_date).format('MMM DD YYYY')}</span> - <span>{moment(event.end_date).format('MMM DD YYYY')}</span></p>
      {event.verified ? <p className="event-verified"><StarIcon /></p> : null}
      <h2 className="event-title">{event.name}</h2>
      <div className="event-info-container">
        <Address address={event.venue_address} address_2={event.venue_address_2} city={event.venue_city} state={event.venue_state} zipcode={event.venue_zipcode}/>
        <AvailableBooths event={event} />
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-tags">
        <DisplayTags tags={event.tags} />
      </div>

    </Card>
  )
}