import React, { useState, useEffect } from "react";
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
import FormatMoney from '../../Utilities/FormatMoney';




// the Row() function is a MUI component called further down 
// within the main AvailableBooths component

function Row({row}) {

  const dispatch = useDispatch();
  const {eventId} = useParams();
  const Swal = require("sweetalert2");
  const user = useSelector((store) => store.user);
  const boothApplications = useSelector((store) => store.boothApplications)

  const [edit, setEdit] = React.useState();


  const applicationPending = boothApplications
                              .filter((boothApp) => {
                                  if (boothApp.vendor_id === user.id && boothApp.event_id === row.event_id) {
                                    console.log('true')
                                    return true;
  } })

  // const newTest = applicationPending.map((app) => {if (app.id === row.id)})
  console.log('appPending', applicationPending)

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
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {edit === row.id ?
        <>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} component="th" scope="row">
          <TextField onChange={(e) => {setNewType(e.target.value)}} id="outlined-basic" size="small" defaultValue={row.type} variant="outlined" />
            {/* <input sx={{width: 1/10}} defaultValue={row.type} onChange={handleChange} ></input> */}
          </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> 
          <TextField onChange={(e) => {setNewDimensions(e.target.value)}} id="outlined-basic" size="small" defaultValue={row.dimensions} variant="outlined" />
            {/* <input defaultValue={row.dimensions} onChange={handleChange} ></input> */}
          </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> 
            <TextField onChange={(e) => {setNewQuantity(e.target.value)}} id="outlined-basic" size="small" defaultValue={row.quantity} variant="outlined" />
            {/* <input defaultValue={row.quantity} onChange={handleChange} ></input> */}
          </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 8 }} align="right">  
          <TextField onChange={(e) => {setNewCost(e.target.value)}} id="outlined-basic" style = {{width: '200%'}} size="small" defaultValue={row.cost} variant="outlined" />
            {/* <input defaultValue={row.cost} onChange={handleChange} ></input> */}
          </TableCell>
        </>
        :
        <>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} component="th" scope="row"> {row.type} </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {row.dimensions} </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {row.quantity} </TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {FormatMoney(row.cost)} </TableCell>
        </>
        }
        {/* checks to see if user is vendor and if true renders a request booth button */}
        {applicationPending.length > 0 ?
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right">
            <Button disabled >
              REQUESTED
            </Button>
          </TableCell>
          :
          user?.type === 'vendor' ?
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
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    {edit === row.id ?
                      <TextField 
                      onChange={(e) => {setNewDescription(e.target.value)}}
                      style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
                      id="outlined-multiline-flexible" size="small" 
                      defaultValue={row.description} 
                      variant="outlined" 
                      multiline
                      maxRows={3}
                      />
                    :
                      <TableCell component="th" scope="row">
                        {row.description}
                      </TableCell>
                    }
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

export default function AvailableBooths({props}) {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  function addRow(id) {
    dispatch({ type: 'ADD_BOOTH', payload: {id}})
  }

  useEffect(() => {
    dispatch({
      type: "FETCH_VENDOR_BOOTH_APPLICATIONS",
      payload: {
        id: props.id,
      }})
  }, [props]);
  
  return (
    <TableContainer 
      component={Paper}
      sx={{
        padding: '1em'
      }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              {user.type === 'vendor' ?
                <></>
              :               
                <IconButton>
                <PlaylistAddIcon onClick={() => {addRow(props.id)}} />
                </IconButton> 
              }
              </TableCell>
            <TableCell align="left" style = {{width: '150%'}}>Type</TableCell>
            <TableCell align="right">Dimensions</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right" >Cost</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.booths.map(row => {
            row.eventOwnerId = props.user_id;
          return <Row key={row.id} row={row} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
