// Import the core libraries and functions
import moment from "moment"
import { useHistory } from "react-router-dom"

// Import the styling elements
import { Card } from "@mui/material"


// Compont that handles the building of a vendor's
// information to a MUI `Card` component
export default function VendorCardComponent({ booth }) {


  // Build the DOM elements
  return (
    <Card
      onClick={() => history.push(`/event/${booth.id}`)}
      key={booth.id}
      elevation={4}
      sx={{
          padding: "1em"
      }}
    >
      <h3>{booth.name}</h3>
      <h5>{moment(booth.start_date).format('MMM DD YYYY')} - {moment(booth.end_date).format('MMM DD YYYY')}</h5>
      <ul>
        <li>Type: {booth.type}</li>
        <li>Dimensions: {booth.dimensions}</li>
        <li>Quantity: {booth.quantity}</li>
        <li>Description: {booth.description}</li>
        <li>Cost: ${booth.cost}</li>
        <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
        {booth.approved_by_host ? 
          <li>Application Status: Approved ✅</li>
          :
          <li>Application Status: Pending ❌</li>
        }
      </ul>
      <br/>
    </Card>
  )
}