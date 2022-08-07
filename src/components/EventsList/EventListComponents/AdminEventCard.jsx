// Import the core libraries and functions
import moment from "moment"
import { useHistory } from "react-router-dom"

// Import the MUI styling elements
import { Card } from "@mui/material"


// Component that handles the display of an admin event
// to the DOM
export default function AdminEventCard({ event }) {


  // Initialize the useHistory() function
  const history = useHistory()

  // Determine the remaining booth display
  const displayBoothInfo = () => {

    // Check if the event is over-booked
    if (event.reserved_booths > event.total_booths) {
      return (
        <>
          <div>
            <p>Over Booked</p>
            <p><span>{event.reserved_booths}</span> of <span>{event.total_booths}</span></p>
          </div>
        </>
      )
    }

    // Check if the event is fully booked
    if (event.reserved_booths === event.total_booths) {
      return (
        <>
          <div>
            <p>Event Full</p>
            <p><span>{event.reserved_booths}</span> of <span>{event.total_booths}</span></p>
          </div>
        </>
      )
    }

    // Default display for the available booths
    return (
      <>
        <div>
          <p><span>{event.available_booths}</span> still available</p>
          <p><span>{event.reserved_booths}</span> of <span>{event.total_booths}</span> booths reserved</p>
        </div>
      </>
    )
  }


  // ---------------------------------------
  // Display the DOM elements
  return (
    <Card
    onClick={() => history.push(`/event/${event.id}`)}
    key={event.id}
    elevation={4}
    sx={{
      padding: "1em",
      margin: '1em'
    }}
  >
    {/* <div onClick={() => history.push(`/event/${event.id}`)}> */}
      <p><span>{moment(event.start_date).format('MMM DD YYYY')}</span> - <span>{moment(event.end_date).format('MMM DD YYYY')}</span></p>
      <h2>{event.name}</h2>
      {displayBoothInfo()}
      <p><i>{event.verified ? 'Verified - <STAR SYMBOL COMPONENT>' : ''}</i></p>
      <p>{event.description}</p>
    {/* </div> */}
    </Card>
  )
}