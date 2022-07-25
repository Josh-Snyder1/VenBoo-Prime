import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function ManageTagsForm() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [eventName, setEventName] = useState("");
  const [address, setLocation] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
  dispatch({ type: 'FETCH_TAGS'})
  };

  const tags = useSelector(store => store.tags);
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


        <button className="submit">Create</button>
      </form>
    </>
  );
}

export default ManageTagsForm;
