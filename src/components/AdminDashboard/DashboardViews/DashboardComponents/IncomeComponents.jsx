// Import the used libraries and functions
import axios from "axios"
import { useEffect, useState } from "react"

// Import the used components
import StatsCard from "../../../ReuseableComponents/StatsCard";


// Import used functions
import FormatMoney from "../../../Utilities/FormatMoney";
import { AllFutureDates, CurrentMonth, CurrentWeek, DateToISOString, NextSevenDays } from "../../../Utilities/SetDateRangeFromDate";

// Component that displays the various income / cost values
// for events over a time range
export default function IncomeComponents() {

  // Set local STATE values
  const [dateRange, setDateRange] = useState(CurrentWeek())
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
      <StatsCard title={"Number of Current Ongoing Events:"} message={currentCosts.number_of_events} />
      <StatsCard title={"Total Amount of Current Ongoing Events:"} message={`${FormatMoney(currentCosts.total_cost)}`}/>
      <StatsCard title={"Income from Current Ongoing Events:"} message={`${FormatMoney(currentCosts.income)}`}/>
      <StatsCard title={"Host Payment from Current Ongoing Events:"} message={`${FormatMoney(currentCosts.host_payment)}`}/>
    </>
  )
}