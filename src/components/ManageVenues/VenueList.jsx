import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";

import EditRow from './EditRow'




// the Row() function is a MUI component called further down 
// within the main AvailableBooths component

function Row({row}) {

const [address, setAddress] = React.useState('');

useEffect(() => {
    axios.get(`/api/address/${row.id}`).then((res) => {setAddress(res.data.shift())});
}, [row]);

  const dispatch = useDispatch();
  const {eventId} = useParams();
  const Swal = require("sweetalert2");
  const user = useSelector((store) => store.user);

  const [edit, setEdit] = React.useState();

  //edit row with updated information.
  //this function only sets the input fields to editable
  function editRow(id){
      setEdit(id);
      setOpen(true)
  }

  const handleChange = event => {
      setNewType(event.target.value)
  }

  function updateRow(id) {
      dispatch({ 
        type: 'EDIT_BOOTH', 
        payload: {
          id,
          newType,
          newDimensions,
          newQuantity,
          newCost,
          newDescription
        }})

    console.log('in updateRow',newType)
    setEdit();
    setOpen(false)
  }

  function deleteRow(id){
    dispatch({ type: 'DELETE_EVENT_BOOTH', payload: {id}})
  }

  function requestBooth(id){
    Swal.fire({
  title: 'Request This Booth?',
  icon: 'question',
  cancelButtonText: 'NO',
  confirmButtonText: 'YES',
  showCloseButton: true,
  showCancelButton: true
}).then((result) => {
  if (result.isConfirmed) {
    dispatch({ type: 'ADD_BOOTH_APPLICATION', payload: {id}})
    Swal.fire('Request Submitted!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})
  }

  const [open, setOpen] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState(false)

  const props = {editStatus, row, address, setOpen}

  const [newType, setNewType] = React.useState(row.type);
  const [newDimensions, setNewDimensions] = React.useState(row.dimensions);
  const [newQuantity, setNewQuantity] = React.useState(row.quantity);
  const [newCost, setNewCost] = React.useState(row.cost);
  const [newDescription, setNewDescription] = React.useState(row.desc);
  

  return (
    <React.Fragment>
      <TableRow style={{ paddingBottom: 0, paddingTop: 0 }} sx={{ '& > *': { borderBottom: 'unset', paddingBottom: 0, paddingTop: 0}}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <EditIcon />}
          </IconButton>
        </TableCell>
        <>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} component="th" scope="row"> {row.name} </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {address.address} {address.address2} <br/> {address.city} {address.state} {address.zipcode} </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {row.contact_name} <br/> {row.contact_email} <br/> {row.contact_phone} </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> <a href={row.contact_url} target="_blank">Click Here</a> </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {row.notes} </TableCell>
        </>
        {/* checks to see if user is vendor and if true renders a request booth button */}
        {user?.type === 'vendor' ?
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right">
            <Button onClick={() =>  requestBooth(row.id)}>
              Request
            </Button>
          </TableCell>
          :
          user?.id === row?.eventOwnerId &&
          <>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right">
              {edit === row.id ?
                <IconButton onClick={() =>  updateRow(row.id)}>
                  <CheckBoxIcon />
                </IconButton>
                :
                <IconButton onClick={() =>  editRow(row.id)}>
                  <EditIcon />
                </IconButton>
              }
            </TableCell>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right">
              <IconButton onClick={() => deleteRow(row.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </>
          // If user is not vendor or event owner
          //render no buttons, just booth details
        }
        {/* <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                    <TableRow>
                      <TableCell>
                    <EditRow props={props}/>
                    </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function VenueList({props}) {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
//   const [address, setAddress] = React.useState('');

  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              </TableCell>
            <TableCell align="left" >Venue Name</TableCell>
            <TableCell align="right" >Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.</TableCell>
            <TableCell align="right">Contact Info</TableCell>
            <TableCell align="right" >Venue Website</TableCell>
            <TableCell align="right" >Notes</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.map(row => {
            row.eventOwnerId = props.user_id;
          return <Row key={row.id} row={row} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
