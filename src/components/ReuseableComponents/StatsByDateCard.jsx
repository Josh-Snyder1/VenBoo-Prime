// Import core libraries and functions
import { useState } from "react"

// Import the used components
import Calender from "./DatePicker"
import MultipleSelectCheckmarks from "./MultiSelect"
import StatsCard from "./StatsCard"

// Import used functions
import EventsInDateRange from "../Utilities/EventsInDateRange"
import { CurrentMonth, CurrentWeek, NextSevenDays, OneDay } from "../Utilities/SetDateRangeFromDate"


// Component that displays stats within a specified time range
export default function StatsByDateCard({ allEvents, dateRange="OneDay" }) {

  // Initialize the message variable
  let messageString

  // Check which date range the user wants to see
  switch (dateRange) {
    case "CurrentMonth":
      dateRange = CurrentMonth
      messageString = "This Month"
      break
    case "CurrentWeek":
      dateRange = CurrentWeek
      messageString = "This Week"
      break
    case "NextSevenDays":
      dateRange = NextSevenDays
      messageString = "These Next Seven Days"
      break
    default:
      dateRange = OneDay
      messageString = "Today"
  }

  // Build the DOM elements
  return (
    <>
      {/* <Calender setDateRange={setDateRange} dateRange={[dateRange.startDate, dateRange.endDate]} /> */}
      <StatsCard title={`Events ${messageString}`} message={`${EventsInDateRange(allEvents, dateRange()).length}`} />
    </>
  )
}