import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MultiSelect from "../ReuseableComponents/MultiSelect";

function AddEventForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <button className="submit">Create</button>
      </form>
    </>
  );
}

export default AddEventForm;
