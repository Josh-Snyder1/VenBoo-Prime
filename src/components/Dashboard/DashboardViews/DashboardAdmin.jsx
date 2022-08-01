// Import the core libraries and functions
import { Grid, Stack, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the used components
import StatsCard from "../../ReuseableComponents/StatsCard";
import StatsByDateCard from "../../ReuseableComponents/StatsByDateCard";

// Import used functions
import EventsInDateRange from "../../Utilities/EventsInDateRange";
import { AddDayToDate, AllFutureDates, NextSevenDays } from "../../Utilities/SetDateRangeFromDate";


// Component that displays the information an admin would see upon login
function DashboardAdmin() {

  // Initialize the dispatch function
  const dispatch = useDispatch();

  // Get the various REDUX store elements
  const user = useSelector((store) => store.user);
  const allEvents = useSelector((store) => store.events);

  // Call the `FETCH_EVENTS` dispatch to get the current
  // events to list for an admin user
  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
  }, [])

  
  // ----------------------------------------------------------
  // Get the number of events with a verified status of `false`
  const pendingVerification = allEvents.filter(eventItem => 
    eventItem.verified === false
  ).length;


  // ----------------------------------------------------------
  // Get the total number of events over the next 7-days
  const numberOfEventsNextSevenDays = allEvents.filter(eventItem => "")


  // ----------------------------------------------------------
  // Get the number of events which are occurring today
  const numberOfEventsToday = allEvents.filter(eventItem => {

    // Assume the event runs through the `end_date`, so
    // call the `AddDayToDate` function to progress the
    // end date value by 1 day.
    const endDate = AddDayToDate(eventItem.end_date)

    // Check that event `start_date` is BEFORE the current
    // datetime and the `end_date` is AFTER the current datetime.
    // If both of those checks are `true`, then the event is
    // occurring today.
    return (new Date(eventItem.start_date) <= new Date())
    &&
    (new Date() < endDate)

  // Get the total number of events that are occurring today.
  }).length
  

  // ----------------------------------------------------------
  // Function to get the number of events where an active date of an
  // event falls within the current week (Mon. - Sun.)
  const eventsOverDateRange = (allEvents) => {
  
    // Get the current date
    const currentDate = new Date()
    // Get the date for the Monday starting this week
    const startOfWeekDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1))
    // Get the date of teh Sunday ending this week
    const endOfWeekDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7))

    // Loop over all events to see which events overlap with the week's date range
    return allEvents.filter(eventItem => 

      // Get events that start BEFORE the `end_date` AND end AFTER the `start_date`
      AddDayToDate(eventItem.end_date) >= startOfWeekDate && new Date(eventItem.start_date) <= endOfWeekDate
    ).length
  }

  // Call the function to get the number of events that occurred during the current week
  // const eventsThisWeek = eventsOverDateRange(allEvents)


  return (
      <>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <h2>DASHBOARD!</h2>
          <p>You are logged in as a <b><u>{user.type}</u></b></p>
          <Card
            elevation={4}
            sx={{
              margin: '1em',
              padding: '1em'
            }}
          >
            <h3>Events</h3>
            <h4>New Events requesting verification: {pendingVerification}</h4>
            <br/>
            <h4>Events within the next week: # {EventsInDateRange(allEvents, NextSevenDays()).length}</h4>
            <br/>
            <h4>Total upcoming events: # {EventsInDateRange(allEvents, AllFutureDates()).length}</h4>
          </Card>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '1em'
            }}
          >
            <Typography
              variant="h4"
            >
              Stats:
            </Typography>


            {/* Card for display the number of events for today */}
            <StatsByDateCard allEvents={allEvents} dateRange={"OneDay"}/>

            {/* Card for display the number of events for this week */}
            <StatsByDateCard allEvents={allEvents} dateRange={"CurrentWeek"}/>

            {/* Card for display the expected income this week */}
            <StatsCard title="Income this Week:" message="$" />

            {/* Card for display the total number of vendors */}
            <StatsCard title="Number of Vendors:" message="#" />

          </Stack>
        </Grid>
      </>
    )
}
export default DashboardAdmin;