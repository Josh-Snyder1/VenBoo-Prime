// Function that takes in a number and returns
// the value as a formatted money field
function FormatMoney (value) {

  // Create the formatter
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  // Format the value and return it
  return formatter.format(value)
}

export default FormatMoney