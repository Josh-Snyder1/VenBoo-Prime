import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Card, Grid, Stack, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function EventListVendor() {
    // Stores
    const vendorBooths = useSelector((store) => store.vendorBoothsReducer);

    // Today's date.
    const todayDate = moment().format('YYYYMMDD');

    // Local state to render items the user wants to view.
    const [viewList, setViewList] = useState('approved');

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_VENDOR_BOOTHS" });
    },[])


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
                    <Button onClick={() => setViewList('approved')}>Approved</Button>
                    <Button onClick={() => setViewList('pending')}>Pending</Button>
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
                    {vendorBooths.map((booth) => {
                        console.log(booth)
                        if (
                            viewList === 'approved'
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) > Number(todayDate)
                            &&
                            booth.approved_by_host
                        )
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
                        else if (
                            viewList === 'pending'
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) > Number(todayDate)
                            &&
                            !booth.approved_by_host
                        )
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
                        else if (
                            viewList === 'past'
                            &&
                            Number(moment(booth.start_date).format('YYYYMMDD')) < Number(todayDate)
                        )
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
                    })}
                </Stack>
            </Grid>
    )
}
export default EventListVendor;