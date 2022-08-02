import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Card, Grid, Stack, Tabs, Tab } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function EventListVendor() {
    // Stores
    const vendorBooths = useSelector((store) => store.vendorBoothsReducer);

    const events = useSelector((store) => store.events)

    // Today's date.
    const todayDate = moment().format('YYYYMMDD');

    const allEvents = useSelector((store) => store.events);


    // Local state to render items the user wants to view.
    const [viewList, setViewList] = useState('approved');

    
    const todayDate = moment().format('YYYYMMDD');
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_VENDOR_BOOTHS" });
    },[])

    // console.log('Test Events Splunk', events.filter((event) => {if(event.booths.includes((booth) => {return booth.id})){return event} }))

    const newEvents= allEvents.filter(event => {
        for (let vBooth of vendorBooths) {
           if (vBooth.event_id === event.id) {
             return false;
           }
        }
        return true;
    });

    const handleChange = (event, newValue) => {
        setViewList(newValue);
    }

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
                                    margin: '1em'
                                }}
                                >
                                <h2>{event.name}</h2>
                                <h4>{moment(event.start_date).format('MMM DD YYYY')} - {moment(event.end_date).format('MMM DD YYYY')}</h4>
                                <h5>{event.description}</h5>
                                </Card>
                            )
                        }
                    })}

                    {/* Approved viewList option render */}
                    {vendorBooths.map((booth) => {
                        if(
                            viewList === 'approved'
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) > Number(todayDate)
                            &&
                            booth.approved_by_host
                        ){
                            return (
                                <Card
                                    onClick={() => history.push(`/event/${booth.id}`)}
                                    key={booth.id}
                                    elevation={4}
                                    sx={{
                                        padding: "1em"
                                    }}
                                >
                                    <h3>{booth.name}</h3>
                                    <h5>{moment(booth.start_date).format('MMM DD YYYY')} - {moment(booth.end_date).format('MMM DD YYYY')}</h5>
                                    <ul>
                                        <li>Type: {booth.type}</li>
                                        <li>Dimensions: {booth.dimensions}</li>
                                        <li>Quantity: {booth.quantity}</li>
                                        <li>Description: {booth.description}</li>
                                        <li>Cost: ${booth.cost}</li>
                                        <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
                                        {booth.approved_by_host ? 
                                            <li>Application Status: Approved ✅</li>
                                            :
                                            <li>Application Status: Pending ❌</li>
                                        }
                                    </ul>
                                    <br/>
                                </Card>
                            )
                        }

                        {/* Pending viewList option render */}
                        if (
                            viewList === 'pending'
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) > Number(todayDate)
                            &&
                            !booth.approved_by_host
                        ){
                            return (
                                <Card
                                    onClick={() => history.push(`/event/${booth.id}`)}
                                    key={booth.id}
                                    elevation={4}
                                    sx={{
                                        padding: "1em"
                                    }}
                                >
                                    <h3>{booth.name}</h3>
                                    <h5>{moment(booth.start_date).format('MMM DD YYYY')} - {moment(booth.end_date).format('MMM DD YYYY')}</h5>
                                    <ul>
                                        <li>Type: {booth.type}</li>
                                        <li>Dimensions: {booth.dimensions}</li>
                                        <li>Quantity: {booth.quantity}</li>
                                        <li>Description: {booth.description}</li>
                                        <li>Cost: ${booth.cost}</li>
                                        <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
                                        {booth.approved_by_host ? 
                                            <li>Application Status: Approved ✅</li>
                                            :
                                            <li>Application Status: Pending ❌</li>
                                        }
                                        <li>Pending</li>
                                    </ul>
                                    <br/>
                                </Card>
                            )
                        }

                        {/* Past viewList option render */}
                        if (
                            viewList === 'past'
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) < Number(todayDate)
                            &&
                            booth.approved_by_host
                        ){
                            return (
                                <Card
                                    onClick={() => history.push(`/event/${booth.id}`)}
                                    key={booth.id}
                                    elevation={4}
                                    sx={{
                                        padding: "1em"
                                    }}
                                >
                                    <h3>{booth.name}</h3>
                                    <h5>{moment(booth.start_date).format('MMM DD YYYY')} - {moment(booth.end_date).format('MMM DD YYYY')}</h5>
                                    <ul>
                                        <li>Type: {booth.type}</li>
                                        <li>Dimensions: {booth.dimensions}</li>
                                        <li>Quantity: {booth.quantity}</li>
                                        <li>Description: {booth.description}</li>
                                        <li>Cost: ${booth.cost}</li>
                                        <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
                                        {booth.approved_by_host ? 
                                            <li>Application Status: Approved ✅</li>
                                            :
                                            <li>Application Status: Pending ❌</li>
                                        }
                                    </ul>
                                    <br/>
                                </Card>
                            )
                        }
                    })}
                </Stack>
            </Grid>
    )
}
export default EventListVendor;