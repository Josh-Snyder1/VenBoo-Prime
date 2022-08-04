// Import the core libraries and functions
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the styling materials
import { Grid, Stack, Tabs, Tab } from "@mui/material";

// Import the used components
import EventCardComponent from "./EventListComponents/EventCardComponent";
import VendorCardComponent from "./EventListComponents/VendorCardComponent";


// Component that shows all the events that the admin can see
export default function EventListAdmin() {

  // Today's date.
  const todayDate = moment().format('YYYYMMDD');

  // Get the events from the REDUX store
  const allEvents = useSelector((store) => store.events);

  // Local state to render items the user wants to view.
  const [viewList, setViewList] = useState('approved');

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
        <Tab value="approved" label="Approved"/>
        <Tab value="pending" label="Pending"/>
        <Tab value="past" label="Past"/>
        <Tab value="new_events" label="New Events"/>
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
        {/* New Events viewList option render */}
        {allEvents.map(event => {
          if (
            viewList === 'new_events'
            &&
            Number(moment(event.end_date).format('YYYYMMDD')) > Number(todayDate)
          ){
            return(
              <EventCardComponent event={event} />
            )
          }
        })}

            {/* Approved viewList option render */}
            {/* {vendorBooths.map((booth) => {
              if(
                viewList === 'approved'
                &&
                Number(moment(booth.start_date).format('YYYYMMDD')) > Number(todayDate)
                &&
                booth.approved_by_host
              ){
                return (
                  <VendorCardComponent booth={booth} />
                )
              } */}

              {/* Pending viewList option render */}
              {/* if (
                viewList === 'pending'
                &&
                Number(moment(booth.start_date).format('YYYYMMDD')) > Number(todayDate)
                &&
                !booth.approved_by_host
              ){
                return (
                  <VendorCardComponent booth={booth} />
                )
              } */}

              {/* Past viewList option render */}
              {/* if (
                viewList === 'past'
                &&
                Number(moment(booth.start_date).format('YYYYMMDD')) < Number(todayDate)
                &&
                booth.approved_by_host
              ){
                return (
                  <VendorCardComponent booth={booth} />
                )
              }
            })} */}
        </Stack>
    </Grid>
  )
}