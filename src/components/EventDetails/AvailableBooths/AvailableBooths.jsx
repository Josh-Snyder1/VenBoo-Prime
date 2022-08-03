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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



function Row({row}) {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [edit, setEdit] = React.useState();
  const [newTag, setNewTag] = React.useState();

  function editRow(id){
    console.log('in edit', id)
      setEdit(id);
      setOpen(!open)
    console.log('in edit', id)
  }

  function deleteRow(id){
    console.log('in deleteRow', id)
    dispatch({ type: 'DELETE_BOOTHS', 
    payload: { rowid: id 
    }})
  }

  const handleChange = event => {
      // setNewTag(event.target.value)
  }

  function updateRow(id) {
    // if ( newTag ) {
    //   dispatch({ type: 'EDIT_TAG', payload: {id,newTag}})
    //   console.log(id,newTag)
    // }
    console.log('in updateRow',id)
    setEdit();
    setOpen(!open)
  }

  const [open, setOpen] = React.useState(false);

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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} component="th" scope="row"> {row.type} </TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {row.dimensions} </TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {row.quantity} </TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right"> {row.cost} </TableCell>
        {user?.type === 'vendor' ?
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} align="right">
            <Button>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
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
                      <TableCell component="th" scope="row">
                        {row.description}
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

export default function AvailableBooths({props}) {

  useEffect(() => {
  }, []);
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell> <PlaylistAddIcon /> </TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="right">Dimensions</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
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
