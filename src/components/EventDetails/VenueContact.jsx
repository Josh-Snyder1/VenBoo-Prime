// Component that displays the contact information
// for the venue
export default function VenueContact({ contactPerson, contactEmail, contactPhone, contactWebsite }) {


  // Build the DOM elements
  return (
    <div className="venue-contact-container">
      <p className="venue-contact-title">Venue Contact</p>
      <p>{contactPerson}</p>
      <a href={`$mailto:${contactEmail}`}>{contactEmail}</a>
      <p>{contactPhone}</p>
      <p>{contactWebsite}</p>
    </div>
  )
}