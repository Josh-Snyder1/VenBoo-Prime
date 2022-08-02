// Import the function to format money
import FormatMoney from "./FormatMoney"

// Function that gets the total cost to collect from vendors
// from all events provided
function GetCostTotalFromEventsList( eventsList, field="booth_cost" ) {

  // Initialize the output value as zero
  let totalCost = 0

  // Loop through all the events
  for (const event of eventsList) {

    // Get the cost of all the booths within the supplied event
    totalCost = event.approved_booths.reduce(
      // Step through each of the booths
      (totalCost, boothObj) => 
        // Add the booths value based on the specified field
        totalCost + boothObj[field],
        // Initial value to start with, keeps a running
        // total that continues between events
        totalCost
    )
  }

  // Return the total cost value back
  return FormatMoney(totalCost)
}


// Make the function accessible
export { GetCostTotalFromEventsList }