import React, { useState } from "react";
import Calender from "./DatePicker";
import { useDispatch } from "react-redux";
import "./AddEventForm.css";

function AddEventForm() {
  const dispatch = useDispatch();
  const [Eventname, setEventName] = useState("");
  const [Location, setLocation] = useState("");
  const [Venue, setVenue] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Description, setDescription] = useState("");
  const [Tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    console.log("Eventname", Eventname);
    console.log("Location", Location);
    console.log("Venue", Venue);
    console.log("City", City);
    console.log("State", State);
    console.log("Description", Description);
    console.log("Tag", Tag);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventForm">Event Name</label>
        <br />
        <input
          type="text"
          placeholder="Event Name"
          onChange={(e) => {
            setEventName(e.target.value);
          }}
          required
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
          required
        />
        <br />
        <label htmlFor="datepicker">StartDate - EndDate</label>
        <Calender />
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

        <select
          required
          name="tags"
          id="Tags"
          onChange={(e) => {
            setTag(e.target.value);
          }}
        >
          <option value="">Select</option>
          <option>Showcase</option>
          <option>Antiques</option>
          <option>Food Vendor</option>
          <option>Content Creator</option>
          <option>Craft Maker</option>
          <option>Marketer</option>
        </select>
        <button className="submit">Create</button>
      </form>
    </>
  );
}

export default AddEventForm;
