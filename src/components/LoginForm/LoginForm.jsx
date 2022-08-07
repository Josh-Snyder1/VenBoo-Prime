import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

// MUI Imports
import { Stack, Button } from '@mui/material';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: email,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-end"
        spacing={1}
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '1em'
        }}
      >
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="email">
            Email:&nbsp;
            <input
              type="text"
              name="email"
              required
              value={email}
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
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
      </Stack>
      <div>
        <Button
          variant='contained'
          className="btn"
          type="submit" 
          name="submit" 
          value="Log In" 
          sx={{
            margin: '1em'
          }}
        >
          Log In
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
