import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Calender from "../ReuseableComponents/DatePicker";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AddEventForm.css";
import MultiSelect from "../ReuseableComponents/MultiSelect";

function AddEventForm() {
  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);

  const Swal = require("sweetalert2");
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const [dateRange, setDateRange] = useState([null, null]);
  const [eventName, setEventName] = useState("");
  const [address, setaddress] = useState("");
  const [addres2, setAddress2] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "New Event Created",
      showConfirmButton: false,
      timer: 1500,
    });

    // history.push(`/event/${id}`);

    dispatch({
      type: "ADD_NEW_EVENT",
      payload: {
        user: user.id,
        name: eventName,
        address: address,
        venue: venue,
        city: city,
        state: state,
        description: description,
        tag: tag,
        date: dateRange,
      },
    });
  };

  const tags = useSelector((store) => store.tags);

  const tagSelection = (tagSelection) => {
    console.log("in tagSelection", tagSelection);
    return setTag(tagSelection);
  };

  let props = {
    tags,
    tagSelection,
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <br />
        <TextField
          id="outlined-required"
          label="Event Name"
          type="text"
          onChange={(e) => {
            setEventName(e.target.value);
          }}
          // required
        />

        <br />
        <br />
        <TextField
          id="outlined-required"
          label="Address"
          type="text"
          onChange={(e) => {
            setaddress(e.target.value);
          }}
          // required
        />
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="Addres_2"
          type="text"
          onChange={(e) => {
            setAddress2(e.target.value);
          }}
          // required
        />
        <br />
        <label htmlFor="datepicker">Date</label>
        <Calender setDateRange={setDateRange} dateRange={dateRange} />
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="Venue"
          type="text"
          onChange={(e) => {
            setVenue(e.target.value);
          }}
          // required
        />
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="City"
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          // required
        />
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="State"
          type="text"
          onChange={(e) => {
            setState(e.target.value);
          }}
          // required
        />

        <br />
        <br />
        <FormControl>
          <InputLabel id="description-select-label">Description</InputLabel>
          <TextareaAutosize
            id="description-select"
            label="description"
            style={{ width: 350, height: 200, resize: "none" }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          ></TextareaAutosize>
        </FormControl>
        <br />
        <br />

        <MultiSelect props={props} />

        <Button className="submit">Create</Button>
      </form>
    </>
  );
}
export default AddEventForm;
