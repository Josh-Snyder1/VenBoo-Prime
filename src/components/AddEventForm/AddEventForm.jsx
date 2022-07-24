import React from "react";
import "./AddEventForm.css";
import Calender from "./DatePicker";
function AddEventForm() {
  return (
    <>
      <form>
        <label htmlFor="eventForm">Event Form</label>
        <br />
        <input type="text" />
        <br />
        <label htmlFor="location">Location</label>
        <br />
        <input type="text" />
        <br />
        <label htmlFor="datepicker">Datepicker</label>
        <Calender />
        <br />
        <label htmlFor="venue">Venue</label>
        <br />
        <input type="text" />
        <br />
        <label htmlFor="city">City</label>
        <br />
        <input type="text" />
        <br />
        <label htmlFor="state">State</label>
        <br />
        <input type="text" />
        <br />
        <label htmlFor=""></label>
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          name="description"
          id="eventDescription"
          cols="30"
          rows="10"
        ></textarea>
        <br />
        <label htmlFor="tags">Tags</label>
        <br />

        <select name="tags" id="Tags">
          <option value="">Select</option>
          <option>Showcase</option>
          <option>Antiques</option>
          <option>Food Vendor</option>
          <option>Content Creator</option>
          <option>Craft Maker</option>
          <option>Marketer</option>
        </select>
        <button>Create</button>
      </form>
    </>
  );
}

export default AddEventForm;
