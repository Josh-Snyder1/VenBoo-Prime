import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';

import "./ProfilePage.css";
import EventsList from "../EventsList/EventsList";
import Icons from "../Icons/Icons";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import ContactButton from '../ReuseableComponents/ContactButton';
import "./Etsy.png";

function ProfilePage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <>
    {user.id &&
    <div className="pageEdit">
      <EditIcon 
        sx={{cursor:'pointer', marginRight:'5px', position:'absolute', display:'flex'}}
        onClick={() => {history.push('/profileForm')}} 
      />
    </div>
    }
      <div id="header">
        <h1>{user.business_name}</h1>
        <Icons />
        <br />
        <ContactButton contactProps={{emails: user.email, buttonText: 'CONTACT US'}}/>
        <br />
        <p>{user.description}</p>
      </div>
      <br />
      <div id="body">
        <EventsList />
      </div>
    </>
  );
}

export default ProfilePage;
