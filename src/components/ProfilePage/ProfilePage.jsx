// Imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Icons from "../Icons/Icons";
import ContactButton from "../ReuseableComponents/ContactButton";
import AddEventForm from "../ProfileForm/ProfileForm";
import "./Etsy.png";
import "./ProfilePage.css";

// MUI Imports
import EditIcon from "@mui/icons-material/Edit";
import { Card, Grid, Stack } from "@mui/material";

// Exported Component Function

function ProfilePage() {
  // Stores
  const user = useSelector((store) => store.user);

  // Local State
  const [profileInfo, setProfileInfo] = useState({});
  const [clicked, setClicked] = useState();
  console.log(clicked);

  // Vars
  const history = useHistory();
  const profileId = useParams().id;

  // Functions
  useEffect(() => {
    axios.get(`/api/user/profile/${profileId}`).then((res) => {
      setProfileInfo(res.data.shift());
    });
  }, [profileId]);

  console.log('this is profileinfo', profileInfo)
  // Render
  return (
    <>
      {user.id != profileId ? (
        <></>
      ) : clicked === true ? (
        <AddEventForm
          profileInfo={profileInfo}
          setClicked={setClicked}
          profileId={profileId}
        />
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Card 
            id="header"
            elevation={4}
            sx={{
              padding: '2em',
              margin: '2em',
              minWidth: '350px',
              maxWidth: '350px'
            }}
          >
            <div className="pageEdit">
              <EditIcon
                sx={{
                  cursor: "pointer",
                  marginLeft: "1.5em",
                  marginTop: "-1em",
                  position: "absolute",
                  display: "flex",
                }}
                onClick={() => {
                  setClicked(true);
                  console.log(clicked);
                }}
              />
            </div>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
              }}
            >
              <div>
                <h1>{profileInfo.business_name}</h1>
                <Icons profileInfo={profileInfo} />
                <br />
                <ContactButton
                  contactProps={{
                    emails: profileInfo.email,
                    buttonText: "Email Us",
                  }}
                />
                <br/>
                <br/>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                  }}
                >
                  <h4>Phone: {profileInfo.phone}</h4>
                  <h4>Location: {profileInfo.city}, {profileInfo.state}</h4>
                  <h4>About Us: {profileInfo.description}</h4>
                </Stack>
              </div>
            </Stack>
          </Card>
        </Grid>
      )}
    </>
  );
}

export default ProfilePage;
