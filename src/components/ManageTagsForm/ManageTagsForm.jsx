import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TagList from './TagList'
import './ManageTags.css'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
    <div className="tagContainer">
      <TagList />
      <form className="tag_form" onSubmit={handleSubmit}>
        <label className="new_tag">New Tag: </label>
        <br />
        <TextField
          type="text"
          placeholder="Event Name"
          onChange={(e) => {
            setNewTag(e.target.value);
          }}
          required
        />
        <br />


        <Button className="submit" variant="contained" color="success">Create</Button>
      </form>
    </div>
  );
}

export default ManageTagsForm;
