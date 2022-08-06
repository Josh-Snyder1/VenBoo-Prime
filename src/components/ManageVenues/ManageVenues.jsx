import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import VenueList from './VenueList'

import MultiSelect from "../ReuseableComponents/MultiSelect";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import InputUnstyled from "@mui/base/InputUnstyled";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";

function ManageVenues() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
  dispatch({ type: 'ADD_TAG', payload: {newTag}})
  e.target.reset();
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_VENUES' });
  }, [showAddForm]);

  const venues = useSelector(store => store.venues);

  const [showAddForm, setShowAddForm] = useState(false);

  const [venueName, setVenueName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");

  console.log(venues.map((venue)=>{return venue.name}))

  return (
    venues.length > 0 &&
    <>
    {showAddForm ?
    <Button onClick={() => {setShowAddForm(false)}} type="submit" variant="contained" color="primary">
        Collapse
    </Button>
    :
    <Button onClick={() => {setShowAddForm(true)}} type="submit" variant="contained" color="primary">
    Add New Venue
    </Button>
    }
    {showAddForm &&
      <form >
        <br />
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      freeSolo
      options={venues.map((venue)=>{return venue.name})}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField onChange={(e) => {setVenueName(e.target.value);}} {...params} label="VenueName" />}
    />
            <br/>
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Address 1"
            type="text"
            onChange={(e) => {
              setAddress1(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Address 2"
            type="text"
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="City"
            type="text"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="State"
            type="text"
            onChange={(e) => {
              setState(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Zip"
            type="text"
            onChange={(e) => {
              setZip(e.target.value);
            }}
            />
            <br/>
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Contact Name"
            type="text"
            onChange={(e) => {
              setContactName(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Contact Phone"
            type="text"
            onChange={(e) => {
              setContactPhone(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Contact Email"
            type="text"
            onChange={(e) => {
              setContactEmail(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Venue Website"
            type="text"
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
            />
            <br />
        <TextField
            sx={{ width: 500 }}
            id="outlined-required"
            label="Notes"
            type="text"
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
    </form>
    }
        <br />
        <VenueList props={venues} />
    </>
  );
}

export default ManageVenues;
