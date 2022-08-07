import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

// MUI Imports
import { Grid, Card, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function RegisterPage() {
  const history = useHistory();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#5246A6',
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
            padding: "1em",
            marginTop: '10em'
        }}
      >
        <Card
          elevation={4}
          sx={{
            padding: '1em'
          }}
        >
          <RegisterForm />
          <center>
            <Button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/login');
              }}
              color='primary'
            >
              Back to Log in
            </Button>
          </center>
        </Card>
      </Grid>
    </ThemeProvider>
    
  );
}

export default RegisterPage;
