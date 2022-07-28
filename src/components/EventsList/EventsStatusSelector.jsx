// Component that handles the display of the buttons
// for updating which events are displayed to the DOM
//
// This includes categories for: PAST, FUTURE, PENDING, ...
export default function EventsStatusSelector({ setViewList }) {

  console.log("in here!")

  // Build the DOM elements
  return (
    <div className="events-status-button-container">

      <button
        type="button"
        onClick={() => setViewList("")}
      >
        Upcoming
      </button>

      <button
        type="button"
        onClick={() => setViewList("pending")}
      >
        Pending Verification
      </button>
      
      <button
        type="button"
        onClick={() => setViewList("past")}
      >
        Past
      </button>

    </div>
  )
}