// Import the core libraries and functions
import moment from "moment"
import { useHistory } from "react-router-dom"

// Import the styling elements
import { Card } from "@mui/material"


// Component that handles the display of an event
// card to the DOM
export default function EventCardComponent({ events }) {

  // Initialize the useHistory function
  const history = useHistory()
    
  if(events !== []){
      // Build the DOM elements
    return (
      events.map((event) => {
        return(
          <Card
            onClick={() => history.push(`/event/${event.id}`)}
            key={event.id}
            elevation={4}
            sx={{
              padding: "1em",
              margin: '1em',
              width: '350px',
              minHeight: '350px'
          }}
          >
            <h2>{event.name}</h2>
            <p><i>{event.verified ? 'Verified' : ''}</i></p>
            <h4>{moment(event.start_date).format('MMM DD YYYY')} - {moment(event.end_date).format('MMM DD YYYY')}</h4>
            <h5>{event.description}</h5>
          </Card>
        )
      })
    )
  }
  // Render nothing if prop is empty.
  else{

    // Render
    return (
        <></>
    )
  }
}