// Import the core libraries and functions
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// Import the used components
import AvailableBooths from './AvailableBooths/AvailableBooths'
import ContactButton from '../ReuseableComponents/ContactButton'
import EditHeader from "./EditHeader";
import Header from './Header'
import VerificationComponent from '../ReuseableComponents/VerificationComponent'

// Import the used MUI components
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Import the local stylesheet
import "./EventDetails.css";

// ----------------------------------------------
// Component that contains all the display components on
// the `EventDetails` page for a specific event
function EventDetails() {

  // Stores
  const eventBoothDetails = useSelector((store) => store.boothApplications);
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.events);
  const event = useSelector(store => store.eventsContainer.currentEvent)

  // Local State
  const [viewList, setViewList] = useState("");
  const [editEvent, setEditEvent] = useState();

  // Initialze the used variables
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  let eventDetails = events
    .filter((event) => event.id === Number(eventId))
    .pop();

  useEffect(() => {
    dispatch({
      type: "FETCH_CURRENT_EVENT",
      payload: {
        eventId: eventId,
      }
    })
  }, [eventId])

  useEffect(() => {
    dispatch({
      type: "FETCH_VENDOR_BOOTH_APPLICATIONS",
      payload: {
        id: eventId,
      },
    });
  }, [eventId]);

  function handleApprove(boothId) {
    dispatch({
      type: "APPROVE_BOOTH_APP",
      payload: {
        boothAppId: boothId,
        id: eventId,
      },
    });
  }

  function toggleEdit() {
    setEditEvent(!editEvent);
  }

  return (
    // adding booths and available booths
    <>
    {/* pass through props to tell component rendering on page vs. card
        and to render for an event vs host/vendor */}
    {/* <VerificationComponent
      props={{
        view: 'page',
        type: 'event',
        details: eventDetails
        }} 
    /> */}
    {user &&
      <>
        {editEvent === false ? (
        <EditHeader
          toggleEdit={toggleEdit}
          eventId={eventId}
          eventDetails={eventDetails}
        />
      ) : (
        eventDetails && <Header toggleEdit={toggleEdit} />
      )}
      </>
    }
      <h1>Available Booths</h1>
      {eventDetails && <AvailableBooths props={eventDetails} />}
      <div>
        <table className="booths_info"></table>
      </div>
      {user.type !== 'vendor' &&
        <>
            <TableContainer component={Paper}>
            <h2>Pending Approval</h2>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="pending">
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendor Name</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Type</TableCell>
                      
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {eventBoothDetails.map((booths)=> {
                          if(booths.approved_by_host === "PENDING"){
                            console.log('booth id is>>>>>', booths.booth_id);
                            return(
                                
                            
                                <TableRow key={booths.id}> 
                                
                                    <TableCell >{booths.business_name}</TableCell>
                                    <TableCell>{booths.tags}</TableCell>
                                    <TableCell>{booths.type}</TableCell>
                                    
                                    <Button size="small" variant="outlined" onClick={() => handleApprove(booths.boothApp_id)}>✅</Button>
                                    <Button size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={ () => dispatch({type: 'DELETE_BOOTH', payload: {id: booths.booth_id} })} ></Button>
                        
                                </TableRow>
                                )}
                            })}
                            </TableBody>
            </Table>
          </TableContainer>

                <ContactButton contactProps={{emails: ['one', 'two'], buttonText: 'Email Vendors'}} />
                
          <TableContainer component={Paper}>
            <h2>Approved</h2>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="approved">
                    <TableHead>
                        <TableRow>
                            <TableCell > Vendor Name</TableCell>
                            <TableCell> Tags</TableCell>
                            <TableCell> Booth Size</TableCell>
                            <TableCell> Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {eventBoothDetails.map((list) => {
                          if (list.approved_by_host === "APPROVED")
                            return(
                                <TableRow key={list.id}>
                                    <TableCell >{list.business_name}</TableCell >
                                    <TableCell >{list.tags}</TableCell >
                                    <TableCell >{list.dimensions}</TableCell >
                                    <TableCell >{list.description}</TableCell >
                                    <Button variant="outlined" disabled>Approved</Button>
                                </TableRow>
                            )
                        })}
                    </TableBody>
            </Table>
          </TableContainer>
        </>
      }
    </>
  );
}
export default EventDetails;
