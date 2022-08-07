import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from "@mui/material/Button";


function EditRow({props}) {
    
    const dispatch = useDispatch();

    const row = props?.row;
    const editStatus = props?.editStatus;
    const address = props?.address;
    const setOpen = props?.setOpen;

    // consodle.log('props',setEdit);

    const [venueName, setVenueName] = useState(row.name);
    const [newAddress, setAddress] = useState(address.address);
    const [address2, setAddress2] = useState(address.address_2);
    const [city, setCity] = useState(address.city);
    const [state, setState] = useState(address.state);
    const [zip, setZip] = useState(address.zipcode);
    const [contactName, setContactName] = useState(row.contact_name);
    const [contactPhone, setContactPhone] = useState(row.contact_phone);
    const [contactEmail, setContactEmail] = useState(row.contact_email);
    const [website, setWebsite] = useState(row.contact_url);
    const [notes, setNotes] = useState(row.notes);
    const [capacity, setCapacity] = useState(row.capacity);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    function updateVenue(id) {
        dispatch({ 
          type: 'EDIT_VENUE', 
          payload: {
            venueId: row.id,
            addressId: address.id,
            venueName,
            newAddress,
            address2,
            city,
            state,
            zip,
            contactName,
            contactPhone,
            contactEmail,
            website,
            capacity,
            notes,
            latitude,
            longitude
          }})
      setOpen(false);
      console.log('editStatus', editStatus)
    }

    return (
        <form >
          {/* <CheckBoxIcon /> */}
        {/* // editStatus === row.id ? */}
            <TextField 
            onChange={(e) => {setVenueName(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0, width: 500 }}
            id={row.name} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={row.name}
            label='Venue Name'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <br/>
            <TextField 
            onChange={(e) => {setAddress(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0}}
            id={row.address} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={address.address}
            label='Address'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setAddress2(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0 }}
            id={row.address2} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={address.address2}
            label='Address 2'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setCity(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0 }}
            id={row.city} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={address.city}
            label='City'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setState(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0, width: 85 }}
            id={row.state} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={address.state}
            label='State'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setZip(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0, width: 85 }}
            id={row.zipcode} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={address.zipcode}
            label='zipCode'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <br/>
            <TextField 
            onChange={(e) => {setContactName(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0 }}
            id={row.contact_name} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={row.contact_name}
            label='Contact Name'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setContactEmail(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0, width: 300 }}
            id={row.contact_email} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={row.contact_email}
            label='Contact Email'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setContactPhone(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0, width: 150 }}
            id={row.contact_phone} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={row.contact_phone}
            label='Contact Phone'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setWebsite(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0, width: 300 }}
            id={row.contact_url} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={row.contact_url}
            label='Website'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setCapacity(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0, width: 85 }}
            id={row.capacity} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={row.capacity}
            label='Capacity'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNotes(e.target.value)}}
            style={{ paddingBottom: 9, paddingTop: 0, width: 800}}
            id={row.notes} size="small" 
            InputLabelProps={{
                shrink: true,
              }}
            defaultValue={row.notes}
            label='Notes'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <Button onClick={(e) => {updateVenue(e)}} type="submit" variant="contained" color="primary">
              Save
            </Button>
{/* 
        //   :
            // <TableCell component="th" scope="row">
            //   {row.description}
            // </TableCell> */}
        </ form>
    )
}

export default EditRow;

