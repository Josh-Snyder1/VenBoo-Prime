import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from "axios";

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
  const dispatch = useDispatch();
  
  const profileId = useParams().id;

  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    axios.get(`/api/user/profile/${profileId}`).then((res) => {setProfileInfo(res.data.shift())});
  }, [profileId]);

  return (
    <>
    {user.id != profileId ?
        <></>
        :
    <div className="pageEdit">
      <EditIcon
        sx={{cursor:'pointer', marginRight:'5px', position:'absolute', display:'flex'}}
        onClick={() => {history.push('/profileForm')}} 
      />
    </div>
    }
      <div id="header">
        <h1>{profileInfo.business_name}</h1>
        <Icons profileInfo={profileInfo}/>
        <br />
        <ContactButton contactProps={{emails: profileInfo.email, buttonText: 'CONTACT US'}}/>
        <br />
        <p>{profileInfo.description}</p>
      </div>
      <br />
      <div id="body">
        <EventsList />
      </div>
    </>
  );
}

export default ProfilePage;
