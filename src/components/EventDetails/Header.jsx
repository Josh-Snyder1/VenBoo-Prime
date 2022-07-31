import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

function Header() {
  const { eventId } = useParams();
  const events = useSelector((store) => store.events);
  return events.map((event) => {
    console.log("event id is>>>><<<<>>>>>>>", event.id);
    console.log(eventId);
    if (event.id === Number(eventId)) {
      return event.name;
    }
  });
}

export default Header;
