import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MultiSelect from "../ReuseableComponents/MultiSelect";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import InputUnstyled from "@mui/base/InputUnstyled";
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
  // REDUX STORE
  const tags = useSelector((store) => store.tags);
  // LOCAL STATE
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  // ON SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    console.log("First Name", name);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div id="profileInfo">
          <h2 className="formHeader">Profile Info</h2>
          <InputLabel>First Name</InputLabel>
          <CustomInput
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <InputLabel>Last Name </InputLabel>
          <CustomInput
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
          <InputLabel>Title</InputLabel>
          <CustomInput type="text" />
          <MultiSelect selectionArray={tags} />
          <InputLabel>Buisness Name </InputLabel>
          <CustomInput type="text" />
          <InputLabel>Description</InputLabel>
          <TextField
            sx={{ width: "320px" }}
            id="description"
            multiline
            rows={6}
          />
        </div>
        <div id="address">
          <h2 className="formHeader">Address</h2>
          <InputLabel>Address</InputLabel>
          <CustomInput type="text" />
          <InputLabel>City</InputLabel>
          <CustomInput type="text" />
          <InputLabel>State</InputLabel>
          <CustomInput type="text" />
          <InputLabel>Zip Code</InputLabel>
          <CustomInput type="text" />
          <InputLabel>Phone Number</InputLabel>
          <CustomInput type="tel" />
        </div>
        <div id="socialMedia">
          <h2 className="formHeader">Social Media</h2>
          <InputLabel>Website</InputLabel>
          <CustomInput type="text" />
          <InputLabel>LinkedIn</InputLabel>
          <CustomInput type="text" />
          <InputLabel>Facebook</InputLabel>
          <CustomInput type="text" />
          <InputLabel>Etsy</InputLabel>
          <CustomInput type="text" />
        </div>
        <button className="submit">Create</button>
      </form>
    </>
  );
}
export default AddEventForm;
