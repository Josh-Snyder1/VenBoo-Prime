// Imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import EventCardComponent from "./EventListComponents/EventCardComponent";

// MUI Imports
import { Tabs, Tab, Grid, Button, Stack, Card } from "@mui/material";

// Exported Function Component
function EventListHost() {
    // Stores
    const user = useSelector((store) => store.user);
    const allEvents = useSelector((store) => store.events);
    console.log(allEvents)

    // Local state
    const [viewList, setViewList] = useState('approved');

    // Vars
    const todayDate = moment().format('YYYYMMDD');
    const history = useHistory();
    const approvedEvents = [];
    const pendingEvents = [];
    const pastEvents = [];

    // Event listener to show different booth lists and new events.
    const handleChange = (event, newValue) => {
        setViewList(newValue);
    }

    // Filter all Events that fall under approved, pending, and past.
    for(let event of allEvents) {
        if(
            event.verified
            &&
            Number(moment(event.start_date).format('YYYYMMDD')) >= Number(todayDate)
        ){
            approvedEvents.push(event)
        }
        else if(
            !event.verified
            &&
            Number(moment(event.start_date).format('YYYYMMDD')) >= Number(todayDate)
        ){
            pendingEvents.push(event)
        }
        else if(
            event.verified
            &&
            Number(moment(event.start_date).format('YYYYMMDD')) < Number(todayDate)
        ){
            pastEvents.push(event)
        }
    }
    
    // Render
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                backgroundColor: "#CEC4F2"
            }}
            >
                {allEvents.length === 0 &&
                    <>
                        <h3>Welcome!</h3>
                        <h3>Looks like you don't have any events, let's create one!</h3>
                        <Button
                            variant="contained"
                            onClick={() => history.push('/addEventForm')}
                        >
                            New Event
                        </Button>
                    </>
                }
                <br/>
                <h3>Your Events</h3>
                <br/>
                <Tabs value={viewList} onChange={handleChange}>
                    <Tab value="approved" label="Approved"/>
                    <Tab value="pending" label="Pending"/>
                    <Tab value="past" label="Past"/>
                </Tabs>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* viewList options render */}
                    {viewList === 'approved' &&
                        <EventCardComponent 
                            events={approvedEvents}
                        />
                    }
                    {viewList === 'pending' &&
                        <EventCardComponent 
                            events={pendingEvents}
                        />
                    }
                    {viewList === 'past' &&
                        <EventCardComponent 
                            events={pastEvents}
                        />
                    }
                </Stack>
            </Grid>
    )
}
export default EventListHost;