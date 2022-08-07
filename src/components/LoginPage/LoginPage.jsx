import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'

// MUI Imports
import { Grid } from '@mui/material';
import { Button, Card, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function LoginPage() {
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
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
            }}
          >
            <img 
              src="../Images/venbooColor.png"
              className="venbooLoginImg"
            />
            <LoginForm />
            <Button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/registration');
              }}
              color="primary"
            >
              Register
            </Button>
          </Stack>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
