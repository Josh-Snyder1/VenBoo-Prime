import React from "react";
import { useSelector } from "react-redux";

import "./HostProfilePage.css";
import EventsList from "../EventsList/EventsList";
import Icons from "../Icons/Icons";
import Button from "@mui/material/Button";
import "./Etsy.png";

function HostProfilePage() {
  const user = useSelector((store) => store.user);
  console.log("COMPANY NAME IS", user);
  return (
    <>
      <div id="header">
        <h1>{user.business_name}</h1>
        <Icons />
        <br />
        <Button variant="contained">Contact</Button>
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

export default HostProfilePage;
