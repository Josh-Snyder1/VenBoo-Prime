// Component that determines the remaining booth display
export default function AvailableBooths({ event }) {

  // Check if the event is over-booked
  if (event.reserved_booths > event.total_booths) {
    return (
      <>
        <div className="available-booths">
          <p className="booths-overbooked">Over Booked</p>
          <p><span>{event.reserved_booths}</span> of <span>{event.total_booths}</span></p>
        </div>
      </>
    )
  }

  // Check if the event is fully booked
  if (event.reserved_booths === event.total_booths) {
    return (
      <>
        <div className="available-booths">
          <p className="booths-event-full">Event Full</p>
          <p><span>{event.reserved_booths}</span> of <span>{event.total_booths}</span></p>
        </div>
      </>
    )
  }

  // Default display for the available booths
  return (
    <>
      <div className="available-booths">
        <p><span>{event.reserved_booths}</span> of <span>{event.total_booths}</span> booths reserved</p>
        <p><span>{event.available_booths}</span> still available</p>
      </div>
    </>
  )
}