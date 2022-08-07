// Imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI Imports
import { Stack, Tabs, Tab, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// Exported function component
function RegisterForm() {

  // Local State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('vendor');

  // Store
  const errors = useSelector((store) => store.errors);

  // Vars
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: 'REGISTER',
      payload: {
        username: email,
        password: password,
        phoneNumber: phoneNumber,
        userType: userType,
      },
    });
  }; // end registerUser

  const handleOption = (event, newValue) => {
    setUserType(newValue);
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5246A6',
    }
  },
});

  return (
    <ThemeProvider theme={theme}>
      <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
          spacing={1}
          sx={{
              display: 'flex',
              flexWrap: 'wrap',
              margin: '1em'
          }}
        >
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <div>
            <label htmlFor="email">
              Email:&nbsp;
              <input
                type="text"
                name="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:&nbsp;
              <input
                type="password"
                name="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="phone-number">
              Phone Number:&nbsp;
              <input
                type="text"
                name="phone-number"
                value={phoneNumber}
                required
                onChange={event => setPhoneNumber(event.target.value)}
              />
            </label>
          </div>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{
              display: 'flex',
              flexWrap: 'wrap',
              margin: '1em'
          }}
        >
          <br/>
          <h4>Select a user type:</h4>
          <Tabs 
              value={userType} 
              onChange={handleOption}

            >
              <Tab value="vendor" label="Vendor"/>
              <Tab value="host" label="Host"/>
            </Tabs>
        </Stack>
        <br/>
        <div>
          <Button
            variant='contained'
            className="btn" 
            type="submit" 
            name="submit" 
            value="Register"
            color='primary'
          >
            Register
          </Button>
        </div>
        <br/>
      </form>
    </ThemeProvider>
    
  );
}

export default RegisterForm;
