// Imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Icons from "../Icons/Icons";
import EditIcon from "@mui/icons-material/Edit";
import ContactButton from "../ReuseableComponents/ContactButton";
import AddEventForm from "../ProfileForm/ProfileForm";
import "./Etsy.png";
import "./ProfilePage.css";

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

  console.log("this is profileinfo", profileInfo);
  // Render
  return (
    <>
      {user.id != profileId ? (
        <> <div id="header">
        <h1>{profileInfo.business_name}</h1>
        <Icons profileInfo={profileInfo} />
        <br />
        <ContactButton
          contactProps={{
            emails: profileInfo.email,
            buttonText: "CONTACT US",
          }}
        />
        <br />
        <p>{profileInfo.description}</p>
      </div></>
      ) : clicked === true ? (
        <AddEventForm
          profileInfo={profileInfo}
          setClicked={setClicked}
          profileId={profileId}
        />
      ) : (
        <>
          <div className="pageEdit">
            <EditIcon
              sx={{
                cursor: "pointer",
                marginRight: "5px",
                position: "absolute",
                display: "flex",
              }}
              onClick={() => {
                setClicked(true);
                console.log(clicked);
              }}
            />
          </div>
          <div id="header">
            <h1>{profileInfo.business_name}</h1>
            <Icons profileInfo={profileInfo} />
            <br />
            <ContactButton
              contactProps={{
                emails: profileInfo.email,
                buttonText: "CONTACT US",
              }}
            />
            <br />
            <p>{profileInfo.description}</p>
          </div>
        </>
      )}
    </>
  );
}

export default ProfilePage;
