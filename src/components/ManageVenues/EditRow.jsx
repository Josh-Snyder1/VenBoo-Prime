


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from '@mui/material/TextField';


function EditRow({props}) {
    
    const row = props?.row;
    const editStatus = props?.editStatus;
    const address = props?.address;

    console.log('props',row);


    return (
        <>
        {/* // editStatus === row.id ? */}
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.name} size="small" 
            defaultValue={row.name}
            label='Venue Name'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.address} size="small" 
            defaultValue={address.address}
            label='Address'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.address2} size="small" 
            defaultValue={address.address2}
            label='Address 2'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.city} size="small" 
            defaultValue={address.city}
            label='City'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.state} size="small" 
            defaultValue={address.state}
            label='State'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.zipcode} size="small" 
            defaultValue={address.zipcode}
            label='zipCode'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <br/>
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.contact_name} size="small" 
            defaultValue={row.contact_name}
            label='Contact Name'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.contact_email} size="small" 
            defaultValue={row.contact_email}
            label='Contact Email'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.contact_phone} size="small" 
            defaultValue={row.contact_phone}
            label='Contact Phone'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.contact_url} size="small" 
            defaultValue={row.contact_url}
            label='Website'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.capacity} size="small" 
            defaultValue={row.capacity}
            label='Capacity'
            variant="outlined" 
            multiline
            maxRows={3}
            />
            <TextField 
            onChange={(e) => {setNewDescription(e.target.value)}}
            // style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }}
            id={row.notes} size="small" 
            defaultValue={row.notes}
            label='Notes'
            variant="outlined" 
            multiline
            maxRows={3}
            />
{/* 
        //   :
            // <TableCell component="th" scope="row">
            //   {row.description}
            // </TableCell> */}
        </>
    )
}

export default EditRow;