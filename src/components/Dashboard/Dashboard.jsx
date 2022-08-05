// Import used libraries and functions
import { useSelector } from "react-redux";

// Import the used components
import EventsList from "../EventsList/EventsList";
import DashboardAdmin from "../AdminDashboard/DashboardViews/DashboardAdmin";

import './Dashboard.css'

// Component that handles the dashboard display
// based on the user-type that logged in
export default function Dashboard() {


  // Stores
  const user = useSelector((store) => store.user);

  // Build the DOM elements
  if(user.type === 'admin'){
    return (
      <DashboardAdmin />
    )
  }
  else {
    return (
      
      <section className="landing_page" >
        <img className="venboo_img" src='../Images/venboo.png'/>

        <div className="curved_upper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#CEC4F2" fill-opacity="1" d="M0,32L48,64C96,96,192,160,288,176C384,192,480,160,576,128C672,96,768,64,864,80C960,96,1056,160,1152,192C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        <div className="curved" >
        <h2 className="dashboard_landing" >DASHBOARD!</h2>
        <p className="p_tag" >You are logged in as a <b><u>{user.type}</u></b></p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,32L48,64C96,96,192,160,288,176C384,192,480,160,576,128C672,96,768,64,864,80C960,96,1056,160,1152,192C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>

        </div>
        <EventsList />
        <p className="venboo_description" >Focus on Passion</p>
        <p className="summary_ven">Venboo simplifies the vendor booking process so you can focus more on what matters to you.</p>
        <img className="booth_img" src="../Images/booths.png" />
        
        <br />
        
       
      </section>
    )}}