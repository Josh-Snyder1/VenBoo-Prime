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
      <h4>{moment(event.start_date).format('MMM DD YYYY')} - {moment(event.end_date).format('MMM DD YYYY')}</h4>
      <h5>{event.description}</h5>
    </Card>
  )
}