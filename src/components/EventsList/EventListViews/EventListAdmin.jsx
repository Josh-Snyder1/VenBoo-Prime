// Import the core libraries and functions
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the styling materials
import { Grid, Stack, Tabs, Tab } from "@mui/material";

// Import the used components
import EventCardComponent from "./EventListComponents/EventCardComponent";
import AdminEventCard from "../EventListComponents/AdminEventCard";

// Import used functions
import { AddDayToDate } from "../../Utilities/SetDateRangeFromDate";


// Component that shows all the events that the admin can see
export default function EventListAdmin() {

  // Get the events from the REDUX store
  const allEvents = useSelector((store) => store.eventsContainer.allEvents);

  // Local state to render items the user wants to view.
  const [viewList, setViewList] = useState('APPROVED');

  // Initialize the dispatch functions
  const dispatch = useDispatch();

  // Get an updated events list
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_EVENTS" });
  },[])

  // Click listener to determine which filter to utilize for
  // displaying the list of events
  const handleChange = (event, newValue) => {
    setViewList(newValue);
  }


  // Filter the events list down by the currently
  // selected label
  const filterEventByCategory = (allEvents) => {

    // Check what filter type the admin is using
    switch (viewList) {

      // Approved events where the end date is in the future
      case "APPROVED":
        return allEvents.filter(eventObj => {
          return (eventObj.verified) &&
          (AddDayToDate(eventObj.end_date) > new Date())
        })

      // Un-approved events where the end date is in the future
      case "PENDING":
        return allEvents.filter(eventObj => {
          return (!eventObj.verified) &&
          (AddDayToDate(eventObj.end_date) > new Date())
        })

      // Any event that is in the past
      case "PAST":
        return allEvents.filter(eventObj => AddDayToDate(eventObj.end_date) < new Date())

      // Default case
      default:
        return allEvents
    }
  }


  // Build the DOM elements
  return (

    <>
    <Grid 
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "1em"
      }}
    >
      <br/>
      <h3>Events List</h3>
      <br/>
      <Tabs value={viewList} onChange={handleChange}>
        <Tab value="APPROVED" label="Approved"/>
        <Tab value="PENDING" label="Pending"/>
        <Tab value="PAST" label="Past"/>
        <Tab value="NEW_EVENTS" label="New Events"/>
      </Tabs>
      
      {filterEventByCategory(allEvents).map(event => {

        // Build the event list blocks
        return(
          <AdminEventCard
          // <EventCardComponent
            key={event.id}
            event={event} />
        )
      })}
    </Grid>
    </>
  )
}