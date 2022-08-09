import * as React from 'react';
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from "react-redux";

function VerificationComponent({props}) {

    useEffect(() => {
        // dispatch({ type: "" });
      }, [details]);

    const dispatch = useDispatch();
    //sweet alert for confirmation of verifying user/event
    const Swal = require("sweetalert2");

    const user = useSelector((store) => store.user);

    // event details of this specific event OR user details
    const details = props?.details;
    // send sql to update event vs user
    const renderType = props.type;
    // render of page vs card
    const view = props.view;

    console.log('event', details)
    console.log('type/view', renderType, view)

    function handleVerify() {
        console.log('handleVerify', details.id)
        Swal.fire({
            title: `Verify this ${renderType}?`,
            icon: 'question',
            cancelButtonText: 'NO',
            confirmButtonText: 'YES',
            showCloseButton: true,
            showCancelButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch({ type: 'SUBMIT_VERIFICATION', payload: {id: details.id, type: renderType, value: true}})
              Swal.fire('Request Submitted!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    return (
        <>
    {user?.type === 'vendor' || 'host' && details?.verified === true ? 
        <>
            <Stack sx={{display:'flex'}} direction="row" spacing={1}>
                <Alert variant="filled" severity="success" sx={{margin: 2}}>
                Verified!
                </Alert>
            </Stack>
        </>
    :
    user?.type === 'vendor' || user?.type === 'host' && details?.verified === false ?
        <Stack sx={{display:'flex'}} direction="row" spacing={1}>
            <Alert variant="filled" severity="info" sx={{margin: 2}}>
                Not Verified
            </Alert>
        </Stack>
    :
    user?.type !== 'admin' ?
    <></>
    :
    user?.type === 'admin' && details?.verified === false ?
        <Stack sx={{ width: '100%', padding: 3, borderRadius:5, display: 'flex' }} spacing={2}>
        <Alert severity="warning" >
            This Event is not Verified! - Do you wish to verify it?
            <Button sx={{marginLeft: 10}}
            onClick={() => {handleVerify()}}>
                VERIFY
            </Button>
        </Alert>
      </Stack>
      :
      <></>
    }
      </>
    );
  }
  
  export default VerificationComponent;