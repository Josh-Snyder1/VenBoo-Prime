import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MultiSelect from "../ReuseableComponents/MultiSelect";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import InputUnstyled from "@mui/base/InputUnstyled";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import { styled } from "@mui/system";
import "./ProfileForm.css";

///////////////////////// MUI INPUT ////////////////////////////////
const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};
const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};
const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 320px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 8px;
  padding: 12px 12px;
  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }
`
);
const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

/////////////////////// VENDOR && HOST PROFILE FORM ////////////////////////////
function AddEventForm() {
  const dispatch = useDispatch();
  // REDUX STORE
  const tags = useSelector((store) => store.tags);
  const user = useSelector((store) => store.user);
  // console.log("userAddressID", user.address_id);
  useEffect(() => {
    dispatch({
      type: "FETCH_TAGS",
    });
  }, []);

  let currentUser = user.type;
  if (user.type === "vendor") {
    currentUser = true;
  }

  // LOCAL STATE
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [BuisnessName, setBuisnessName] = useState("");
  const [description, setdescription] = useState("");
  // ADDRESS
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Select State");
  const [zip, setZip] = useState("");
  const [phone, setTelephone] = useState("");
  // SOCIAL MEDIA
  const [website, setWebsite] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [facebook, setFacebook] = useState("");
  const [etsy, setEtsy] = useState("");

  // ON SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        user: user.id,
        addressId: user.address_id,
        name,
        lastName,
        title,
        BuisnessName,
        description,
        address,
        city,
        state,
        zip,
        phone,
        website,
        linkedIn,
        facebook,
        etsy,
        tag,
      },
    });
    e.target.reset();
  };

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
        <div id="profileInfo">
          <h2 className="formHeader">Profile Info</h2>
          <br />
          <TextField
            sx={{ width: 320 }}
            id="outlined-required"
            label="First Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            requiredx
          />
          <br />
          <br />
          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />

          {currentUser === true ? <MultiSelect props={props} /> : <h2></h2>}
          <br />
          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="Buisness Name"
            onChange={(e) => {
              setBuisnessName(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <TextField
            sx={{ width: 320 }}
            id="outlined-required"
            label="Description"
            multiline
            rows={6}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            required
          />
        </div>

        <div id="address">
          <h2 className="formHeader">Address</h2>
          <br />
          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <FormControl>
            <InputLabel id="state-select-label">State*</InputLabel>
            <Select
              sx={{ width: 320 }}
              labelId="state-select-label"
              id="state-select"
              label="State"
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
            sx={{ width: 320 }}
            type="tel"
            id="outlined-required"
            label="Zip Code"
            onChange={(e) => {
              setZip(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <TextField
            sx={{ width: 320 }}
            type="tel"
            id="outlined-required"
            label="Phone Number"
            onChange={(e) => {
              setTelephone(e.target.value);
            }}
            required
          />
          <br />
          <br />
        </div>

        <div id="socialMedia">
          <h2 className="formHeader">Social Media</h2>
          <br />
          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="Website"
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="LinkedIn"
            onChange={(e) => {
              setLinkedIn(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="Facebook"
            onChange={(e) => {
              setFacebook(e.target.value);
            }}
            required
          />
          <br />
          <br />

          <TextField
            sx={{ width: 320 }}
            type="text"
            id="outlined-required"
            label="Etsy"
            onChange={(e) => {
              setEtsy(e.target.value);
            }}
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </>
  );
}
export default AddEventForm;
