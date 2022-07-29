import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Card, Grid, Stack, Button } from "@mui/material";

function EventListAdmin() {
    // Stores
    const user = useSelector((store) => store.user);
    // const vendorBooths = useSelector((store) => store.booths);
    const allEvents = useSelector((store) => store.events);

    // Today's date.
    const todayDate = moment().format('YYYYMMDD');

    // Local state to render items the user wants to view.
    const [viewList, setViewList] = useState('');

    return (
        <>
        </>
    )
}
export default EventListAdmin;