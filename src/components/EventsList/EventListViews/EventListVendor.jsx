// Imports
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import BoothCard from "../../BoothCard/BoothCard";

// MUI Imports
import { Card, Grid, Stack, Tabs, Tab } from "@mui/material";

// Exported Component Function
function EventListVendor() {
    
    // Stores
    const vendorBooths = useSelector((store) => store.vendorBoothsReducer);
    const allEvents = useSelector((store) => store.events);

    // Local state to render items the user wants to view.
    const [viewList, setViewList] = useState('approved');

    // Vars
    const todayDate = moment().format('YYYYMMDD');
    const history = useHistory();
    const dispatch = useDispatch();
    const approvedBooths = [];
    const pendingBooths = [];
    const pastBooths = [];

    // Functions
    useEffect(() => {
        dispatch({ type: "FETCH_VENDOR_BOOTHS" });
    },[])

    // Filter out events the vendor user does not have any
    //  booths at.
    const newEvents = allEvents.filter(event => {
        for (let vBooth of vendorBooths) {
           if (vBooth.event_id === event.id) {
             return false;
           }
        }
        return true;
    });

    //  Loop through the vendorBooths array to sort booths based
    //      on approved, pending, or past approved.
    for(let item of vendorBooths) {
        for(let booth of item){
            if(
                booth.approved_by_host === 'APPROVED' 
                && 
                Number(moment(booth.start_date).format('YYYYMMDD')) >= Number(todayDate)
            ){
                approvedBooths.push(booth)
            }
            else if(
                booth.approved_by_host === 'PENDING'
                &&
                Number(moment(booth.start_date).format('YYYYMMDD')) >= Number(todayDate)
            ){
                pendingBooths.push(booth)
            }
            else if(
                booth.approved_by_host === 'APPROVED' 
                &&
                Number(moment(booth.start_date).format('YYYYMMDD')) < Number(todayDate)
            ){
                pastBooths.push(booth)
            }
        }
    }

    // Event listener to show different booth lists and new events.
    const handleChange = (event, newValue) => {
        setViewList(newValue);
    }

    // Render
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <br/>
            <h3>Your Booths</h3>
            <br/>
            <Tabs value={viewList} onChange={handleChange}>
                <Tab value="approved" label="Approved"/>
                <Tab value="pending" label="Pending"/>
                <Tab value="past" label="Past"/>
                <Tab value="new_events" label="New Events"/>
            </Tabs>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {/* New Events viewList option render */}
                {newEvents.map(event => {
                    if (
                        viewList === 'new_events'
                        &&
                        Number(moment(event.start_date).format('YYYYMMDD')) > Number(todayDate)
                    ){
                        return(
                            <Card
                            onClick={() => history.push(`/event/${event.id}`)}
                            key={event.id}
                            elevation={4}
                            sx={{
                                padding: "1em",
                                margin: '1em',
                                width: '350px',
                                minHeight: '350px'
                            }}
                            >
                            <h2>{event.name}</h2>
                            <h4>{moment(event.start_date).format('MMM DD YYYY')} - {moment(event.end_date).format('MMM DD YYYY')}</h4>
                            <h5>{event.description}</h5>
                            </Card>
                        )
                    }
                })}
                {/* viewList options render */}
                {viewList === 'approved' && 
                    <BoothCard
                        booths={approvedBooths}
                    />
                }
                {viewList === 'pending' && 
                    <BoothCard
                        booths={pendingBooths}
                    />
                }
                {viewList === 'past' && 
                    <BoothCard
                        booths={pastBooths}
                    />
                }
            </Stack>
        </Grid>
    )
}

export default EventListVendor;