import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
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
  const [address2, setAddress2] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // SWEET ALERT 2
    var toastMixin = Swal.mixin({
      toast: true,
      icon: "success",
      title: "General Title",
      animation: false,
      position: "middle",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    toastMixin.fire({
      position: "bottom-right",
      animation: true,
      title: "Event Created",
    });

    dispatch({
      type: "ADD_NEW_EVENT",
      payload: {
        user: user.id,
        name: eventName,
        address: address,
        address2: address2,
        venue: venue,
        city: city,
        state: state,
        description: description,
        tag: tag,
        date: dateRange,
      },
    });
    setTimeout(function () {
      history.push("/");
    }, 2500);
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
          required
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
          required
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
          required
        />
        <br />
        <br />
        <FormControl>
          <Calender
            id="datepicker-select"
            label="datepicker"
            setDateRange={setDateRange}
            dateRange={dateRange}
          />
        </FormControl>

        <br />
        <br />
        <TextField
          id="outlined-required"
          label="Venue"
          type="text"
          onChange={(e) => {
            setVenue(e.target.value);
          }}
          required
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
          required
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
          required
        />

        <br />
        <br />

        <TextareaAutosize
          placeholder="Description"
          style={{ width: 350, height: 200, resize: "none" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        ></TextareaAutosize>

        <br />
        <br />

        <MultiSelect props={props} required />

        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </>
  );
}
export default AddEventForm;
