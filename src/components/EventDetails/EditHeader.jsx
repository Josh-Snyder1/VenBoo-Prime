// GENERAL IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// REUSABLE COMPONENTS
import MultiSelect from "../ReuseableComponents/MultiSelect";
import Calender from "../ReuseableComponents/DatePicker";

// MUI IMPORTS
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

// BASIC CSS STYLES
import "./styles/EditHeader.css";

function editHeader({ toggleEdit, eventId, eventDetails }) {
  const dispatch = useDispatch();

  // REDUX STORE
  const userId = useSelector((store) => store.user.id);
  const tags = useSelector((store) => store.tags);
  const venueId = eventDetails.venue_id;

  // LOCAL STATE
  const [dateRange, setDateRange] = useState([null, null]);
  const [eventName, setEventName] = useState(eventDetails.name);
  const [venueName, setVenueName] = useState("");
  const [address, setEventAddress] = useState(eventDetails.address[0].address);
  const [city, setCity] = useState(eventDetails.address[0].city);
  const [state, setState] = useState(eventDetails.address[0].state);
  const [zip, setZip] = useState(eventDetails.address[0].zipcode);
  const [tag, setTag] = useState([]);
  console.log("tags list is >>>", tag);
  const tagSelection = (tagSelection) => {
    console.log("in tagSelection", tagSelection);
    return setTag(tagSelection);
  };

  let props = {
    tags,
    tagSelection,
  };

  // SUBMIT FORM
  function handleSubmit(e) {
    e.preventDefault();
    console.log("hello Submit button clicked here");
    toggleEdit();
    dispatch({
      type: "UPDATE_EVENT_DETAILS",
      payload: {
        eventId,
        userId,
        venueId,
        venueName,
        eventName,
        startDate: dateRange[0],
        endDate: dateRange[1],
        address,
        city,
        state,
        zip,
        tag,
      },
    });
  }
  return (
    <>
      <form className="updateEventForm">
        <TextField
          required
          id="outlined-required"
          label="Event Name"
          defaultValue={eventName}
          onChange={(e) => {
            setEventName(e.target.value);
          }}
        />
        <br />

        <br />
        <Calender
          required
          id="datePicker"
          setDateRange={setDateRange}
          dateRange={dateRange}
        />

        <br />
        <br />
        <TextField
          required
          id="outlined-required"
          label="Venue Name"
          defaultValue={venueName}
          onChange={(e) => {
            setVenueName(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          required
          id="outlined-required"
          label="Event Address"
          defaultValue={address}
          onChange={(e) => {
            setEventAddress(e.target.value);
          }}
        />
        <br />

        <br />
        <TextField
          required
          id="outlined-required"
          label="City"
          defaultValue={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <br />

        <br />
        <FormControl>
          <InputLabel id="state-select-label">State *</InputLabel>
          <Select
            sx={{ width: 100 }}
            labelId="state-select-label"
            id="state-select"
            label="State"
            defaultValue={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            required
          >
            <MenuItem value="AL">Alabama</MenuItem>
            <MenuItem value="AK">Alaska</MenuItem>
            <MenuItem value="AZ">Arizona</MenuItem>
            <MenuItem value="AR">Arkansas</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="CO">Colorado</MenuItem>
            <MenuItem value="CT">Connecticut</MenuItem>
            <MenuItem value="DE">Delaware</MenuItem>
            <MenuItem value="DC">District Of Columbia</MenuItem>
            <MenuItem value="FL">Florida</MenuItem>
            <MenuItem value="GA">Georgia</MenuItem>
            <MenuItem value="HI">Hawaii</MenuItem>
            <MenuItem value="ID">Idaho</MenuItem>
            <MenuItem value="IL">Illinois</MenuItem>
            <MenuItem value="IN">Indiana</MenuItem>
            <MenuItem value="IA">Iowa</MenuItem>
            <MenuItem value="KS">Kansas</MenuItem>
            <MenuItem value="KY">Kentucky</MenuItem>
            <MenuItem value="LA">Louisiana</MenuItem>
            <MenuItem value="ME">Maine</MenuItem>
            <MenuItem value="MD">Maryland</MenuItem>
            <MenuItem value="MA">Massachusetts</MenuItem>
            <MenuItem value="MI">Michigan</MenuItem>
            <MenuItem value="MN">Minnesota</MenuItem>
            <MenuItem value="MS">Mississippi</MenuItem>
            <MenuItem value="MO">Missouri</MenuItem>
            <MenuItem value="MT">Montana</MenuItem>
            <MenuItem value="NE">Nebraska</MenuItem>
            <MenuItem value="NV">Nevada</MenuItem>
            <MenuItem value="NH">New Hampshire</MenuItem>
            <MenuItem value="NJ">New Jersey</MenuItem>
            <MenuItem value="NM">New Mexico</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="NC">North Carolina</MenuItem>
            <MenuItem value="ND">North Dakota</MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="OK">Oklahoma</MenuItem>
            <MenuItem value="OR">Oregon</MenuItem>
            <MenuItem value="PA">Pennsylvania</MenuItem>
            <MenuItem value="RI">Rhode Island</MenuItem>
            <MenuItem value="SC">South Carolina</MenuItem>
            <MenuItem value="SD">South Dakota</MenuItem>
            <MenuItem value="TN">Tennessee</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
            <MenuItem value="UT">Utah</MenuItem>
            <MenuItem value="VT">Vermont</MenuItem>
            <MenuItem value="VA">Virginia</MenuItem>
            <MenuItem value="WA">Washington</MenuItem>
            <MenuItem value="WV">West Virginia</MenuItem>
            <MenuItem value="WI">Wisconsin</MenuItem>
            <MenuItem value="WY">Wyoming</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          required
          id="outlined-required"
          label="Zip"
          defaultValue={zip}
          onChange={(e) => {
            setZip(e.target.value);
          }}
        />
        <br />
        <MultiSelect props={props} />
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </form>
    </>
  );
}

export default editHeader;
