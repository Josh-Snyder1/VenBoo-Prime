import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TagList from './TagList'

function ManageTagsForm() {

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
      <TagList />
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventForm">New Tag: </label>
        <br />
        <input
          type="text"
          placeholder="Event Name"
          onChange={(e) => {
            setNewTag(e.target.value);
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
