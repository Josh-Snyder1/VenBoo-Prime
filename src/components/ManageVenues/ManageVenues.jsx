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
import Button from "@mui/material/Button";

function ManageVenues() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  dispatch({ type: 'ADD_TAG', payload: {newTag}})
  e.target.reset();
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_TAGS' });
  }, []);

  const tags = useSelector(store => store.tags);


  return (
    tags.length > 0 &&
    <>
      <form onSubmit={handleSubmit}>
        <br />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Venue Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required />
            <br/>
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Address 1"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Address 2"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="City"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="State"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Zip"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
            <br/>
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Contact Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Contact Phone"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Contact Email"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
        <TextField
            sx={{ width: 250 }}
            id="outlined-required"
            label="Venue Website"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
            <br />
        <TextField
            sx={{ width: 500 }}
            id="outlined-required"
            label="Notes"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
        <br />
        <VenueList />
        
      </form>
    </>
  );
}

export default ManageVenues;
