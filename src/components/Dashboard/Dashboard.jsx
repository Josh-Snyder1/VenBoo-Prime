// Import used libraries and functions
import { useSelector } from "react-redux";

// Import the used components
import EventsList from "../EventsList/EventsList";
import EventsListComponent from "../EventsList/EventsListComponent"

// Component that handles the dashboard display
// based on the user-type that logged in
export default function Dashboard() {


  // Stores
  const user = useSelector((store) => store.user);

  // Build the DOM elements
  return (
    <section>
      <h2>DASHBOARD!</h2>

      <p>You are logged in as a <b><u>{user.type}</u></b></p>

      <br />
      
      <EventsListComponent />
    </section>
  )
}