// Component that handles the clean display of address information
export default function Address({ address, address_2, city, state, zipcode }) {

  // Build the address line
  let addressString = ""
  let cityStateString = ""

  // Test if the `address` field is provided
  if (address) {
    addressString += address
  }

  // Test if the `address_2` field is provided
  if (address_2) {
    // Check if the `address` field was blank
    if (!address) {
      addressString += address_2
    }
    // Otherwise, add on the `address_2` field
    else {
      addressString += `, ${address_2}`
    }
  }

  // Test if a `city` field is provided
  if (city) {
    cityStateString += city
  }

  // Test if a `state` field is provided
  if (state) {
    // Check if a `city` field was blank
    if (!city) {
      cityStateString += state
    }
    // Otherwise, add on the `state` field
    else {
      cityStateString += `, ${state}`
    }
  }

  // Test if a `zipcode` field is provided
  if (zipcode) {
    // If the `cityStateString` is blank, only show the zipcode
    if (!cityStateString) {
      cityStateString += zipcode
    }
    // Otherwise, add the `zipcode` to the end
    else {
      cityStateString += ` ${zipcode}`
    }
  }

  // Build the DOM elements
  return (
    <div className="address">
      
      {addressString ?
        <p className="address-line">{addressString}</p>
        :
        null
      }

      {cityStateString ?
        <p className="city-state-line">{cityStateString}</p>
        :
        null
      }

    </div>
  )
}