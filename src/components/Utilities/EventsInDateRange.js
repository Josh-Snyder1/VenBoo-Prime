// Import used functions
import { AddDayToDate } from "./SetDateRangeFromDate"

// ----------------------------------------------------------
// Function to get the number of events where an active date of an
// event falls within the current week (Mon. - Sun.)
const EventsInDateRange = (eventsArray, dateObj) => {


  // Loop over all events to see which events overlap with the week's date range
  return eventsArray.filter(eventItem => 

    // Get events that start BEFORE the `end_date` AND end AFTER the `start_date`
    AddDayToDate(eventItem.end_date) >= dateObj.startDate && new Date(eventItem.start_date) <= dateObj.endDate
  )
}


export default EventsInDateRange