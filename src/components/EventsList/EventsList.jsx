import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function EventsList() {
  // Stores
  const user = useSelector((store) => store.user);
  const vendorBooths = useSelector((store) => store.booths);
  const allEvents = useSelector((store) => store.events);

  // Today's date.
  const todayDate = moment().format("YYYYMMDD");

  // Local state to render items the user wants to view.
  const [viewList, setViewList] = useState("");

  // EventList render if user is a "Host".
  if (user.type === "host") {
    return (
      <>
        <button onClick={() => setViewList("")}>Upcoming</button>
        <button onClick={() => setViewList("pending")}>
          Pending Verification
        </button>
        <button onClick={() => setViewList("past")}>Past</button>

        {allEvents.map((itemEvent) => {
          if (
            itemEvent.user_id === user.id &&
            viewList === "" &&
            Number(moment(itemEvent.start_date).format("YYYYMMDD")) >
              Number(todayDate)
            // &&
            // itemEvent.verified
          ) {
            return (
              <div key={itemEvent.id}>
                <br />
                <h4>{itemEvent.name}</h4>
                <ul>
                  <li>
                    {moment(itemEvent.start_date).format("MMM DD YYYY")} -{" "}
                    {moment(itemEvent.end_date).format("MMM DD YYYY")}
                  </li>
                  <li>{itemEvent.description}</li>
                  <li>Upcoming</li>
                </ul>
              </div>
            );
          } else if (
            itemEvent.user_id === user.id &&
            viewList === "pending" &&
            Number(moment(itemEvent.start_date).format("YYYYMMDD")) >
              Number(todayDate)
            // &&
            // !itemEvent.verified
          ) {
            return (
              <div key={itemEvent.id}>
                <br />
                <h4>{itemEvent.name}</h4>
                <ul>
                  <li>
                    {moment(itemEvent.start_date).format("MMM DD YYYY")} -{" "}
                    {moment(itemEvent.end_date).format("MMM DD YYYY")}
                  </li>
                  <li>{itemEvent.description}</li>
                  <li>Pending Event</li>
                </ul>
              </div>
            );
          } else if (
            itemEvent.user_id === user.id &&
            viewList === "past" &&
            Number(moment(itemEvent.start_date).format("YYYYMMDD")) <
              Number(todayDate)
          ) {
            return (
              <div key={itemEvent.id}>
                <br />
                <h4>{itemEvent.name}</h4>
                <ul>
                  <li>
                    {moment(itemEvent.start_date).format("MMM DD YYYY")} -{" "}
                    {moment(itemEvent.end_date).format("MMM DD YYYY")}
                  </li>
                  <li>{itemEvent.description}</li>
                  <li>Past Event</li>
                </ul>
              </div>
            );
          }
        })}
      </>
    );
  }
  // EventList render if User is a "Vendor".
  else if (user.type === "vendor") {
    return (
      <>
        <br />
        <h3>Your Booths</h3>
        <br />
        <button onClick={() => setViewList("")}>Upcoming</button>
        <button onClick={() => setViewList("pending")}>Pending Approval</button>
        <button onClick={() => setViewList("past")}>Past</button>
        <br />

        {vendorBooths.map((booth) => {
          if (
            viewList === "" &&
            Number(moment(booth.start_date).format("YYYYMMDD")) >
              Number(todayDate) &&
            booth.approved_by_host
          )
            return (
              <div key={booth.id}>
                <br />
                <h4>{booth.name}</h4>
                <h5>
                  {moment(booth.start_date).format("MMM DD YYYY")} -{" "}
                  {moment(booth.end_date).format("MMM DD YYYY")}
                </h5>
                <ul>
                  <li>Type: {booth.type}</li>
                  <li>Dimensions: {booth.dimensions}</li>
                  <li>Quantity: {booth.quantity}</li>
                  <li>Description: {booth.description}</li>
                  <li>Cost: ${booth.cost}</li>
                  <li>
                    Requested on:{" "}
                    {moment(booth.requested_on).format("MMM DD YYYY")}
                  </li>
                  {booth.approved_by_host && (
                    <li>Application Status: Approved ✅</li>
                  )}
                  {!booth.approved_by_host && (
                    <li>Application Status: Pending ❌</li>
                  )}
                  <li>Upcoming</li>
                </ul>
                <br />
              </div>
            );
          else if (
            viewList === "pending" &&
            Number(moment(booth.start_date).format("YYYYMMDD")) >
              Number(todayDate) &&
            !booth.approved_by_host
          )
            return (
              <div key={booth.id}>
                <br />
                <h4>{booth.name}</h4>
                <h5>
                  {moment(booth.start_date).format("MMM DD YYYY")} -{" "}
                  {moment(booth.end_date).format("MMM DD YYYY")}
                </h5>
                <ul>
                  <li>Type: {booth.type}</li>
                  <li>Dimensions: {booth.dimensions}</li>
                  <li>Quantity: {booth.quantity}</li>
                  <li>Description: {booth.description}</li>
                  <li>Cost: ${booth.cost}</li>
                  <li>
                    Requested on:{" "}
                    {moment(booth.requested_on).format("MMM DD YYYY")}
                  </li>
                  {booth.approved_by_host && (
                    <li>Application Status: Approved ✅</li>
                  )}
                  {!booth.approved_by_host && (
                    <li>Application Status: Pending ❌</li>
                  )}
                  <li>Pending</li>
                </ul>
                <br />
              </div>
            );
          else if (
            viewList === "past" &&
            Number(moment(booth.start_date).format("YYYYMMDD")) <
              Number(todayDate)
          )
            return (
              <div key={booth.id}>
                <br />
                <h4>{booth.name}</h4>
                <h5>
                  {moment(booth.start_date).format("MMM DD YYYY")} -{" "}
                  {moment(booth.end_date).format("MMM DD YYYY")}
                </h5>
                <ul>
                  <li>Type: {booth.type}</li>
                  <li>Dimensions: {booth.dimensions}</li>
                  <li>Quantity: {booth.quantity}</li>
                  <li>Description: {booth.description}</li>
                  <li>Cost: ${booth.cost}</li>
                  <li>
                    Requested on:{" "}
                    {moment(booth.requested_on).format("MMM DD YYYY")}
                  </li>
                  {booth.approved_by_host && (
                    <li>Application Status: Approved ✅</li>
                  )}
                  {!booth.approved_by_host && (
                    <li>Application Status: Pending ❌</li>
                  )}
                  <li>Past</li>
                </ul>
                <br />
              </div>
            );
        })}
      </>
    );
    // returns nothing if there is no user type
  } else {
    return <></>;
  }
}
export default EventsList;
