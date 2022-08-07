import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from "react-redux";

function VerificationComponent({props}) {

    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    // event details of this specific event
    const event = props?.eventDetails;
    const profileInfo = props?.profileInfo;
    // render of 
    const renderType = props.type;

    const view = props.view;

    console.log('event', event)
    console.log('type/view', renderType, view)

    function handleVerify() {
        console.log('handleVerify', event.id)
        
    }

    return (
        // if not admin, only show verification star
    user?.type === 'vendor' || 'host' && event?.verified === true ? 
        <>
            <Stack sx={{display:'flex', flexDirection: 'row-reverse'}} direction="row" spacing={1}>
                <Alert variant="filled" severity="success" sx={{margin: 2}}>
                Verified!
                </Alert>
            </Stack>
        </>
    :
        <Stack sx={{ width: 600, padding: 3, borderRadius:5 }} spacing={2}>
        <Alert severity="warning" >
            This Event is not Verified! - Do you wish to verify it?
            <Button sx={{marginLeft: 10}}
            onClick={() => {handleVerify()}}>
                VERIFY
            </Button>
        </Alert>
      </Stack>
    );
  }
  
  export default VerificationComponent;