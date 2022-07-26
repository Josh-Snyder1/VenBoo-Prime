import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();


  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => {
        dispatch({ type: 'LOGOUT' })
        // setTimeout(() => {
        history.push("/")
        // }, 250)
      }}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
