import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import MultiSelect from "../ReuseableComponents/MultiSelect";
import moment from "moment";

function Header({ toggleEdit }) {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  // REDUX STORE
  const events = useSelector((store) => store.events);
  const booths = useSelector((store) => store.boothApplications);
  const user = useSelector((store) => store.user);
  const tags = useSelector((store) => store.tags);

  // LOCALE STATE
  const [tag, setTag] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);

  let Pending = 0;
  let Approved = 0;
  let Available = 0;
  let total = 0;

  const tagSelection = (tagSelection) => {
    console.log("in tagSelection", tagSelection);
    return setTag(tagSelection);
  };

  let props = {
    tags,
    tagSelection,
  };
  let eventDetails = events.filter((event) => {
    if (event.id === Number(eventId)) {
      return event;
    }
  });
  eventDetails = eventDetails.pop();

  for (const booth of booths) {
    // Checks to see if the booth is approved and If it belongs to the current user
    // Renders total Approved and total Pending booths quantity

    if (Number(eventId) === booth.event_id) {
      if (booth.approved_by_host === false) {
        Pending += booth.quantity;
      }
      if (booth.approved_by_host === true) {
        Approved += booth.quantity;
      }
    }
    total = Pending + Approved;
    Available = total - Approved;
  }

  const address = eventDetails?.address[0];
  const selectedTags = eventDetails?.tags;

  switch (user.type) {
    case "host":
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

                {/* <MultiSelect props={props} /> */}
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
    case "vendor":
      return (
        <>
          {eventDetails && (
            <ul>
              <h2> {eventDetails.name} </h2>
              <br />
              {moment(eventDetails.start_date).format("MMMM Do")} -{" "}
              {moment(eventDetails.end_date).format("MMMM Do YYYY")}
              <br />
              Avalible booths: {Available}
            </ul>
          )}
        </>
      );
    default:
      return <></>;
  }
}

export default Header;
