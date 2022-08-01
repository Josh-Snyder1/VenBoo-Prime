// Import the used libraries and functions
import { Card } from "@mui/material"

// Component used for displaying a stat card
export default function StatsCard({ title, message }) {


  // Build the DOM elements
  return (

    // Use the MUI `Card` component
    <Card
      elevation={4}
      sx={{
        margin: '1em',
        padding: '1em'
      }}
    >
      <h3>{title}</h3>
      <p>{message}</p>
    </Card>
  )
}