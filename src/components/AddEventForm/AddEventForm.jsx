import React, { useState, useEffect } from "react";

import Calender from "./DatePicker";
import { useSelector, useDispatch } from "react-redux";
import "./AddEventForm.css";
import MultiSelect from "../ReuseableComponents/MultiSelect";

function AddEventForm() {
  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const [dateRange, setDateRange] = useState([null, null]);
  const [eventName, setEventName] = useState("");
  const [address, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    console.log("Eventname", eventName);
    console.log("address", address);
    console.log("Venue", venue);
    console.log("City", city);
    console.log("State", state);
    console.log("Description", description);
    console.log("Tag", tag);

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
        <label htmlFor="eventForm">Event Name</label>
        <br />
        <input
          type="text"
          placeholder="Event
           Name"
          onChange={(e) => {
            setEventName(e.target.value);
          }}
          // required
        />
        <br />
        <label htmlFor="location">Location</label>
        <br />
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          // required
        />
        <br />
        <label htmlFor="datepicker">StartDate - EndDate</label>
        <Calender setDateRange={setDateRange} dateRange={dateRange} />
        <br />
        <label htmlFor="venue">Venue</label>
        <br />
        <input
          type="text"
          placeholder="Venue"
          onChange={(e) => {
            setVenue(e.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="city">City</label>
        <br />
        <input
          type="text"
          placeholder="City"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="state">State</label>
        <br />
        <input
          type="text"
          placeholder="State"
          onChange={(e) => {
            setState(e.target.value);
          }}
          required
        />

        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
          name="description"
          id="eventDescription"
          placeholder="Event Description"
          cols="30"
          rows="10"
        ></textarea>
        <br />
        <label htmlFor="tags">Tags</label>
        <br />

        <MultiSelect props={props} />

        <button className="submit">Create</button>
      </form>
    </>
  );
}

export default AddEventForm;
