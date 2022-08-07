import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AddEventForm.css";

// MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import { Stack, Grid, Card } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';


// Reuseable Imports
import MultiSelect from "../ReuseableComponents/MultiSelect";
import Calender from "../ReuseableComponents/DatePicker";


// Exported Function Component
function AddEventForm() {

  // Stores
  const user = useSelector((store) => store.user);


  // Local State
  const [dateRange, setDateRange] = useState([null, null]);
  const [eventName, setEventName] = useState("");
  const [address, setaddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [venue, setVenue] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState();

  // Vars
  const Swal = require("sweetalert2");
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#5246A6',
      }
    },
  });



  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);



  function handleAutoFill() {
    console.log("in auto fill");
    setDateRange([new Date("2022-11-11"), new Date("2022-11-12")]);
    setEventName("Twin Cities Con 2022");
    setaddress("1301 2nd Ave S");
    setAddress2("");
    setVenue("Minneapolis Convetion Center");
    setPhone("(612) 335-6000");
    setEmail("info@nerdstreet.net");
    setCity("Minneapolis");
    setState("MN");
    setZip("55407");
    setDescription(
      "Twin Cities Con is a celebration of comics, toys, TV, film, art, cosplay, games, and all things nerdy. If you're a fan of Batman, the Avengers, Doctor Who, Star Wars, LEGO, Disney, Star Trek, the Walking Dead, Power Rangers, Game of Thrones, etc., you'll probably fit right in at TCC!!"
    );
    setTag(0);
  }

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
      timer: 1500,
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
        phone: phone,
        email: email,
        city: city,
        state: state,
        description: description,
        tag: tag,
        date: dateRange,
        zip: zip,
      },
    });
    setTimeout(function () {
      history.push("/");
    }, 1500);
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
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{
              display: 'flex',
              flexWrap: 'wrap',
          }}
        >
          <br/>
          <h1 onClick={handleAutoFill}>Add Event</h1>
          <form onSubmit={handleSubmit}>
            <Card
              elevation={4}
              sx={{
                padding: '2em',
                margin: '2em'
              }}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '1em'
                }}
              >
                <TextField
                  value={eventName}
                  id="outlined-required"
                  label="Event Name"
                  type="text"
                  onChange={(e) => {
                    setEventName(e.target.value);
                  }}
                  required
                />
                <TextField
                  value={venue}
                  id="outlined-required"
                  label="Venue Name"
                  type="text"
                  onChange={(e) => {
                    setVenue(e.target.value);
                  }}
                  required
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '1em'
                }}
              >
                <TextField
                  value={address}
                  id="outlined-required"
                  label="Address"
                  type="text"
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                  required
                />
                <TextField
                  value={address2}
                  id="outlined-required"
                  label="Addres_2"
                  type="text"
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                />
                <TextField
                  value={city}
                  id="outlined-required"
                  label="City"
                  type="text"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  required
                />
                <TextField
                  value={state}
                  id="outlined-required"
                  label="State"
                  type="text"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  required
                />
                <TextField
                  value={zip}
                  id="outlined-required"
                  label="Zip"
                  type="text"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  required
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '1em'
                }}
              >
                <TextField
                  value={phone}
                  id="outlined-required"
                  label="phone"
                  type="tel"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  required
                />
                <TextField
                  value={email}
                  id="outlined-required"
                  label="email"
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <MultiSelect 
                  value={tag}   
                  props={props}
                  required 
                  sx={{
                    padding: '0'
                  }}
                />
                <FormControl>
                  <Calender
                    id="datepicker-select"
                    label="datepicker"
                    setDateRange={setDateRange}
                    dateRange={dateRange}
                  />
                </FormControl>
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
              >
              <br/>
              <TextareaAutosize
                  value={description}
                  placeholder="Description"
                  style={{ width: '80%', height: 100, resize: "none" }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                >
                </TextareaAutosize>
                <br/>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </Stack>
            </Card>
          </form>
        </Stack>
      </Grid>
    </ThemeProvider>
  );
}
export default AddEventForm;
