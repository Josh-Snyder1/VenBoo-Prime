// Import the core libraries and functions
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the styling materials
import { Grid, Stack, Tabs, Tab } from "@mui/material";

// Import the used components
import EventCardComponent from "./EventListComponents/EventCardComponent";
import VendorCardComponent from "./EventListComponents/VendorCardComponent";

// Import used functions
import { AddDayToDate } from "../../Utilities/SetDateRangeFromDate";


// Component that shows all the events that the admin can see
export default function EventListAdmin() {

  // Today's date.
  const todayDate = moment().format('YYYYMMDD');

  // Get the events from the REDUX store
  const allEvents = useSelector((store) => store.events);

  // Local state to render items the user wants to view.
  const [viewList, setViewList] = useState('APPROVED');

  // Initialize the dispatch functions
  const dispatch = useDispatch();

  // Get an updated events list
  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
  },[])

  // Click listener to determine which filter to utilize for
  // displaying the list of events
  const handleChange = (event, newValue) => {
    setViewList(newValue);
  }


  // Filter the events list down by the currently
  // selected label
  const filterEventByCategory = (allEvents) => {

    switch (viewList) {
      case "APPROVED":
        return allEvents.filter(eventObj => eventObj.verified)
      case "PENDING":
        return allEvents.filter(eventObj => !eventObj.verified)
      case "PAST":
        return allEvents.filter(eventObj => AddDayToDate(eventObj.end_date) < new Date())
      default:
        return allEvents
    }
  }


  // Build the DOM elements
  return (

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
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={1}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '1em'
        }}
      >
        {/* Filters the events list by the user selected category up top */}
        {filterEventByCategory(allEvents).map(event => {

          // Build the event list blocks
          return(
            <EventCardComponent event={event} />
          )
        })}
        
      </Stack>
    </Grid>
  )
}