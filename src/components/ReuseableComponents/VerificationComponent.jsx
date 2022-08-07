import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

function VerificationComponent({props}) {

    const event = props.eventDetails;
    const renderType = props.type;
    const view = props.view;

    console.log('event', event)
    console.log('type/view', renderType, view)

    function handleVerify() {
        console.log('handleVerify')
    }

    const user = useSelector((store) => store.user);

    return (
        // if not admin, only show verification star
    user &&
        <Stack sx={{ width: 600, padding: 3, borderRadius:5 }} spacing={2}>
        <Alert severity="warning" >
            This Event is not Verified! - Do you wish to verify it?
            <Button sx={{marginLeft: 10}}
            onClick={() => {handleVerify}}>
                VERIFY
            </Button>
        </Alert>
      </Stack>
    );
  }
  
  export default VerificationComponent;