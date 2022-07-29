// Import used libraries and functions
import { Link } from "react-router-dom"

// Component that displays welcome information for any
// user that visits the site and is not logged in.
export default function WelcomePage() {


  // Build the DOM elements
  return (
    <section>
      <h2>Welcome Page!</h2>
      
      <p>This page is for users who are not logged in!</p>

      <Link to="/login">Login</Link>
      <br />
      <Link to="/registration">Register</Link>
    </section>
  )
}