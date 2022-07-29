import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();


  return (
    <button
      className={props.className}
      onClick={() => {
        dispatch({ type: 'LOGOUT' })
        history.push("/")
      }}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
