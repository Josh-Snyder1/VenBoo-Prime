import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TagList from './TagList'

function ManageTagsForm() {

  const dispatch = useDispatch();

  //set tags to redux store on load
  useEffect(() => {
    dispatch({ type: 'FETCH_TAGS' });
  }, []);

  // pulls user and tag information from store
  const user = useSelector((store) => store.user);
  const tags = useSelector(store => store.tags);

  const [newTag, setNewTag] = useState("");

  //on submit of form send tag to database
  const handleSubmit = (e) => {
    e.preventDefault();
  dispatch({ type: 'ADD_TAG', payload: {newTag}})
  e.target.reset();
  };

  return (
    tags.length > 0 &&
    <>
    {/* Call TagList component to render list of existing tags from database */}
      <TagList />
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventForm">New Tag: </label>
        <br />
        {/* input for new tag to be entered */}
        <input
          type="text"
          placeholder="Event Name"
          //on change update the newTag variable with input box value
          onChange={(e) => {
            setNewTag(e.target.value);
          }}
          required
        />
        <br />
        {/* submit button for add new tag form */}
        <button className="submit">Create</button>
      </form>
    </>
  );
}

export default ManageTagsForm;
