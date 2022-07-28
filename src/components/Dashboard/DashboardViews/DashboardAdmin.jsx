import { Grid, Stack, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


function DashboardAdmin() {
  const user = useSelector((store) => store.user);
  const allEvents = useSelector((store) => store.events);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
  }, [])

   const pendingVerification = allEvents.filter(eventItem => {
    console.log('eventItem', eventItem.verified)
    return eventItem.verified === false
   }).length;

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
              <h4>Events within the next week: #</h4>
              <br/>
              <h4>Total upcoming events: #</h4>
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
              <Card
                elevation={4}
                sx={{
                  margin: '1em',
                  padding: '1em'
                }}
              >
                <h3>Events Today:</h3>
                <p>#</p>
              </Card>
              <Card
                elevation={4}
                sx={{
                  margin: '1em',
                  padding: '1em'
                }}
              >
                <h3>Events this Week:</h3>
                <p>#</p>
              </Card>
              <Card
                elevation={4}
                sx={{
                  margin: '1em',
                  padding: '1em'
                }}
              >
                <h3>Income this Week:</h3>
                <p>#</p>
              </Card>
              <Card
                elevation={4}
                sx={{
                  margin: '1em',
                  padding: '1em'
                }}
              >
                <h3># of Vendors:</h3>
                <p>#</p>
              </Card>
            </Stack>
          </Grid>
        </>
    )
}
export default DashboardAdmin;