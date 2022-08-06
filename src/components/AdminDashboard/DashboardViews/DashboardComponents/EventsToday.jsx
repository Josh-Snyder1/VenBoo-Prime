// Import the used libraries and functions
import axios from "axios"
import { useEffect, useState } from "react"

// Import the used components
import StatsCard from "../../../ReuseableComponents/StatsCard";

// Import used functions
import FormatMoney from "../../../Utilities/FormatMoney";
import { DateToISOString, OneDay } from "../../../Utilities/SetDateRangeFromDate";

// Component that displays the various income / cost values
// for events over a time range
export default function EventsToday() {

  // Set local STATE values
  const [dateRange, setDateRange] = useState(OneDay())
  const [currentCosts, setCurrentCosts] = useState({})

  // Call the server to get the current money values
  // for events over the specified date range
  useEffect(() => {
    axios.get(`api/admin/get-event-cost-details-by-date/${DateToISOString(dateRange.startDate)}/${DateToISOString(dateRange.endDate)}`)
    .then(result => setCurrentCosts(result.data[0]))
    .catch(error => console.log("error", error))

  // Update this call with each dateRange change
  }, [dateRange])


  // Build the DOM elements
  return (
    <>
      <StatsCard title={"Events Today:"} message={currentCosts.number_of_events} />
      <StatsCard title={"Today's Cost:"} message={`${FormatMoney(currentCosts.total_cost)}`}/>
      <StatsCard title={"Today's Income:"} message={`${FormatMoney(currentCosts.income)}`}/>
      <StatsCard title={"Today's Host Payment:"} message={`${FormatMoney(currentCosts.host_payment)}`}/>
    </>
  )
}