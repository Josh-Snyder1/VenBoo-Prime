import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Card, Grid, Stack, Button } from "@mui/material";

function EventListVendor() {
    // Stores
    const user = useSelector((store) => store.user);
    // const vendorBooths = useSelector((store) => store.booths);
    const allEvents = useSelector((store) => store.events);

    // Today's date.
    const todayDate = moment().format('YYYYMMDD');

    // Local state to render items the user wants to view.
    const [viewList, setViewList] = useState('');

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
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    <Button onClick={() => setViewList('')}>Upcoming</Button>
                    <Button onClick={() => setViewList('pending')}>Pending Approval</Button>
                    <Button onClick={() => setViewList('past')}>Past</Button>
                    <br/>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginTop: '1em'
                    }}
                >
                    {allEvents.map((booth) => {
                        if (
                            viewList === ''
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) > Number(todayDate)
                            &&
                            booth.approved_by_host
                        )
                        return (
                            <Card
                                key={booth.id}
                                elevation={4}
                                sx={{
                                    padding: "1em"
                                }}
                            >
                                <h4>{booth.name}</h4>
                                <h5>{moment(booth.start_date).format('MMM DD YYYY')} - {moment(booth.end_date).format('MMM DD YYYY')}</h5>
                                <ul>
                                    <li>Type: {booth.type}</li>
                                    <li>Dimensions: {booth.booths[0].dimensions}</li>
                                    <li>Quantity: {booth.quantity}</li>
                                    {/* <li>Description: {booth.description}</li> */}
                                    <li>Cost: ${booth.cost}</li>
                                    <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
                                    {booth.approved_by_host && 
                                        <li>Application Status: Approved ✅</li>
                                    }
                                    {!booth.approved_by_host &&
                                        <li>Application Status: Pending ❌</li>
                                    }
                                    <li>Upcoming</li>
                                </ul>
                                <br/>
                            </Card>
                        )
                        else if (
                            viewList === 'pending'
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) > Number(todayDate)
                            &&
                            !booth.approved_by_host
                        )
                        return (
                            <Card
                                key={booth.id}
                                elevation={4}
                                sx={{
                                    padding: "1em"
                                }}
                            >
                                <h4>{booth.name}</h4>
                                <h5>{moment(booth.start_date).format('MMM DD YYYY')} - {moment(booth.end_date).format('MMM DD YYYY')}</h5>
                                <ul>
                                    <li>Type: {booth.booths[0].type}</li>
                                    <li>Dimensions: {booth.booths[0].dimensions}</li>
                                    <li>Quantity: {booth.booths[0].quantity}</li>
                                    {/* <li>Description: {booth.description}</li> */}
                                    <li>Cost: ${booth.booths[0].cost}</li>
                                    <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
                                    {booth.approved_by_host && 
                                        <li>Application Status: Approved ✅</li>
                                    }
                                    {!booth.approved_by_host &&
                                        <li>Application Status: Pending ❌</li>
                                    }
                                    <li>Pending</li>
                                </ul>
                                <br/>
                            </Card>
                        )
                        else if (
                            viewList === 'past'
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) < Number(todayDate)
                        )
                        return (
                            <Card
                                key={booth.id}
                                elevation={4}
                                sx={{
                                    padding: "1em"
                                }}
                            >
                                <h4>{booth.name}</h4>
                                <h5>{moment(booth.start_date).format('MMM DD YYYY')} - {moment(booth.end_date).format('MMM DD YYYY')}</h5>
                                <ul>
                                    <li>Type: {booth.type}</li>
                                    <li>Dimensions: {booth.booths[0].dimensions}</li>
                                    <li>Quantity: {booth.booths[0].quantity}</li>
                                    {/* <li>Description: {booth.booths[0].description}</li> */}
                                    <li>Cost: ${booth.booths[0].cost}</li>
                                    <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
                                    {booth.approved_by_host && 
                                        <li>Application Status: Approved ✅</li>
                                    }
                                    {!booth.approved_by_host &&
                                        <li>Application Status: Pending ❌</li>
                                    }
                                    <li>Past</li>
                                </ul>
                                <br/>
                            </Card>
                        )
                    })}
                </Stack>
            </Grid>
    )
}
export default EventListVendor;