import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

function Header({ toggleEdit }) {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  // REDUX STORE
  const events = useSelector((store) => store.events);
  const boothApplications = useSelector((store) => store.boothApplications);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);

  let Pending = 0;
  let Approved = 0;
  let Available = 0;
  let total = 0;

  let eventDetails = events.filter((event) => {
    if (event.id === Number(eventId)) {
      return event;
    }
  });
  eventDetails = eventDetails.pop();

  // for (const booth of eventDetails.booths) {
  //   total = total + booth.quantity;
  // }
  for (const booth of boothApplications) {
    // Checks to see if the booth is approved and If it belongs to the current user
    // Renders total Approved and total Pending booths quantity

    if (Number(eventId) === booth.event_id) {
      if (booth.approved_by_host === "PENDING") {
        Pending += booth.quantity;
      }
      if (booth.approved_by_host === "APPROVED") {
        Approved += booth.quantity;
      }
    }
    // total = Pending + Approved;
    // Available = total - Approved;
  }

  console.log(total);
  // total = totalbooth.quantity;
  // const booths = eventDetails.booths;

  // total = total;

  const address = eventDetails?.address[0];

  const selectedTags = eventDetails?.tags;

  return (
    <>
      {
        <div className="pageEdit">
          <EditIcon
            sx={{
              cursor: "pointer",
              marginRight: "5px",
              position: "absolute",
              display: "flex",
            }}
            onClick={() => {
              toggleEdit();
            }}
          />
        </div>
      }

      {eventDetails && (
        <ul>
          <h2> {eventDetails.name} </h2>
          <br />
          <div className="eventAddress">
            {moment(eventDetails.start_date).format("MMMM Do")} -{" "}
            {moment(eventDetails.end_date).format("MMMM Do YYYY")}
            <br />
            {eventDetails.venue}
            {address.address},&nbsp;{address.city},&nbsp;{address.state}
            &nbsp;
            {address.zipcode}
          </div>

          <div className="eventTags">
            {selectedTags.map((tagName) => {
              return (
                <>
                  {" "}
                  <p>{tagName.name}</p>{" "}
                </>
              );
            })}
          </div>

          <div className="eventBoothStats">
            <br />
            Total Approved Booths: {Approved}
            <br />
            Pending Booths: {Pending}
            <br />
            Avalible: {Available}
            <br />
          </div>
        </ul>
      )}
    </>
  );
}

export default Header;
