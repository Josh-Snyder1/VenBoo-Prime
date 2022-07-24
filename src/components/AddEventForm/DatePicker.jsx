import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const Calender = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(null);

  function addDays(date, days) {
    // Calculates new date here
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    // console.log(result);
    const newDate = result;

    return newDate;
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
      dateFormat="MMMM d, yyyy h:mm aa"
      selectsRange
      selectsDisabledDaysInRange
      inline
    />
  );
};
export default Calender;
