// Import the core libraries and functions
import moment from "moment"
import { useHistory } from "react-router-dom"

// Import the styling elements
import { Card } from "@mui/material"


// Component that handles the display of an event
// card to the DOM
export default function EventCardComponent({ event }) {

  // Initialize the useHistory function
  const history = useHistory()
    
  // Build the DOM elements
  return(
    <Card
      onClick={() => history.push(`/event/${event.id}`)}
      key={event.id}
      elevation={4}
      sx={{
        padding: "1em",
        margin: '1em'
      }}
    >
      <h2>{event.name}</h2>
      <p><i>{event.verified ? 'Verified' : ''}</i></p>
      <p><span>{moment(event.start_date).format('MMM DD YYYY')}</span> - <span>{moment(event.end_date).format('MMM DD YYYY')}</span></p>
      <p>{event.description}</p>
    </Card>
  )
}