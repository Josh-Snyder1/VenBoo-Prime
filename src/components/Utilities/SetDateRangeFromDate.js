// Function that takes returns the date range for a
// single day. Takes in a date, or defaults to the
// current day
function OneDay (date = new Date()) {

  // Return the date range for today
  return {
    startDate: RemoveTimeFromDate(date),
    endDate: AddDayToDate(
      RemoveTimeFromDate(date)
    )
  }
}


// Function that returns the current week.
// Weeks being on Monday and end on Sunday at this time
function CurrentWeek (date = new Date()) {

  const startOfWeek = 1 // Signifies Monday
  const endOfWeek = 8   // Signififes Sunday

  // Get the date of the Monday starting this week
  const startOfWeekDate = new Date(
    // Reset the date
    date.setDate(
      // Get the current date, subtract of the numeric day of the week,
      // and then update with the requested start of the week
      date.getDate() - date.getDay() + startOfWeek
    )
  )
  // Get the date of the Sunday ending this week
  const endOfWeekDate = new Date(
    date.setDate(
      date.getDate() - date.getDay() + endOfWeek
    )
  )

  // Return the date range for the current week
  return {
    startDate: RemoveTimeFromDate(startOfWeekDate),
    endDate: RemoveTimeFromDate(endOfWeekDate),
  }
}


// Function that sets a week's worth of days
function NextSevenDays (date = new Date()) {

  // Get the date one week from the current date
  const endOfWeekDate = new Date(
    date.setDate(
      // Progress the date by a week, date ending at midnight
      date.getDate() + 8
    )
  )

  // Return the date range for the next seven days
  return {
    startDate: RemoveTimeFromDate(date),
    endDate: RemoveTimeFromDate(endOfWeekDate),
  }
}


// Function that gets the current month's date range
function CurrentMonth (date = new Date()) {

  // Get the date of the first day of the month
  const startOfMonthDate = new Date(date.setDate(1))
  // Get the date of the last day of the previous month

  const endOfPreviousMonthDate = new Date(
    // `setDate(0)` sets the date to the last day of the
    // previous month.
    date.setDate(0)
  )

  // Add a month, which should bring us to the end
  // of the current month
  const endOfMonthDate = new Date(
    // Set the month of the date
    endOfPreviousMonthDate.setMonth(
      // Progress the month by one
      endOfPreviousMonthDate.getMonth() + 1
    )
  )


  // Return the date range for the next seven days
  return {
    startDate: RemoveTimeFromDate(startOfMonthDate),
    endDate: RemoveTimeFromDate(endOfMonthDate),
  }
}


// Function that sets the current date as the start and sets
// the end date to the maximum allowed date in JS
function AllFutureDates (date = new Date()) {

  // Return a range for all future dates
  return {
    startDate: RemoveTimeFromDate(date),
    // Maximum date allowed within Javascript
    endDate: new Date(8640000000000000),
  }
}


// Function that removes the time out of the inputted
// date, keeping date values starting and ending at midnight
function RemoveTimeFromDate (date) {

  // Return the cleaned date
  return new Date(new Date(date).toDateString())
}


// Function that takes in a date and then adds a day to
// that current date.
//
// Mainly used when a logic check needs to be done against
// the `end_date` value. This is because our end date in the
// database is set as (example) '2022-07-29'. Javascript will
// interpret that as midnight at the start of that date.
// This function allows us to assume the function occurred through
// the specified `end_date`, which is why we will progress
// the `end_date` by a singular day.
function AddDayToDate (endDate) {
  
  // Set the input date to a date object
  const inputEndDate = new Date(endDate)

  // Update the inputted end date by a day
  return new Date(inputEndDate.setDate(inputEndDate.getDate() + 1))
}


// Return the value to the caller
export { AddDayToDate, AllFutureDates, CurrentMonth, CurrentWeek, NextSevenDays, OneDay, RemoveTimeFromDate }