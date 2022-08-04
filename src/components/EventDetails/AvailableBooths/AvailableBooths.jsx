import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

// the Row() function is a MUI component called further down 
// within the main AvailableBooths component

function Row({row}) {

  const dispatch = useDispatch();
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
      console.log('in handleChange', event.target.value)
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
    dispatch({ type: 'ADD_BOOTH_APPLICATION', payload: {id}})
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
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {row.cost} </TableCell>
        </>
        }
        {user?.type ==='vendor' ?
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right">
            <Button onClick={() =>  requestBooth(row.id)}>
              Request Booth
            </Button>
          </TableCell>
          :
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
    console.log('in addRow')
    dispatch({ type: 'ADD_BOOTH', payload: {id}})
  }

  useEffect(() => {
  }, []);
  
  return (
    <TableContainer component={Paper}>
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
          {props?.booths.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
