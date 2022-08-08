// Import the core libraries and functions
import { Grid, Stack, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Import the used components
import EventsToday from "./DashboardComponents/EventsToday";
import IncomeComponents from "./DashboardComponents/IncomeComponents"
import StatsCard from "../../ReuseableComponents/StatsCard";
import StatsByDateCard from "../../ReuseableComponents/StatsByDateCard";
import './DashboardComponents/DashboardAdmin.css'

// Import used functions
import EventsInDateRange from "../../Utilities/EventsInDateRange";
import { AllFutureDates, CurrentWeek, NextSevenDays } from "../../Utilities/SetDateRangeFromDate";

// MUI
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


// Component that displays the information an admin would see upon login
function DashboardAdmin() {

  // Initialize the dispatch function
  const dispatch = useDispatch()

  // Get the various REDUX store elements
  const user = useSelector(store => store.user)
  const allEvents = useSelector(store => store.events)
  const vendors = useSelector(store => store.vendors)
  

  // Call the `FETCH_EVENTS` dispatch to get the current
  // events to list for an admin user
  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" })
  }, [])

  // Call the `FETCH_VENDORS` dispatch to get the current
  // vendors to list for an admin user
  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" })
  }, [])

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_APPROVED_VENDOR_BOOTHS" })
  }, [])

  
  // ----------------------------------------------------------
  // Get the number of events with a verified status of `false`
  const pendingVerification = allEvents.filter(eventItem => 
    eventItem.verified === false
  ).length;


  return (
      <>
    
      {/* <img className="waves" src="../Images/layeredwaves.jpg"/> */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <DashboardIcon></DashboardIcon>
          <h1 className="dash">DASHBOARD!</h1>
          
          <p className="p_log">You are logged in as a <b><u>{user.type}</u></b></p>
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

            {/* Recap the main highlights of the events over a time range */}
            <IncomeComponents />

            {/* Card for display the total number of vendors */}
            <StatsCard title="Number of Vendors:" message={vendors.allVendors.length} />

          </Stack>
        </Grid>
      </>
    )
}
export default DashboardAdmin;