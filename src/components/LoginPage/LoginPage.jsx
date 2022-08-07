import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

// MUI Imports
import { Grid } from '@mui/material';
import { Button, Card, Stack } from '@mui/material';


function LoginPage() {
  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
          margin: '1em',
          padding: "1em"
      }}
    >
      <Card
        elevation={4}
        sx={{
          padding: '1em'
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
              display: 'flex',
              flexWrap: 'wrap',
          }}
        >
          <LoginForm />
          <Button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
}

export default LoginPage;
