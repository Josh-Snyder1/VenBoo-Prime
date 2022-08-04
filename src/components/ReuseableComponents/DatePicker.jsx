import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
// import { useDispatch } from "react-redux";

const Calender = ({ setDateRange, dateRange }) => {
  // const dispatch = useDispatch();
  // const [dateRange, setDateRange] = useState([null, null]);

  // useState([null, null]);
  const [startDate, endDate] = dateRange;
  // dispatch({
  //   type: "SET_DATES",
  //   payload: dateRange,
  // });
  return (
    <DatePicker
      required
      placeholderText="Select Dates*"
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable
    />
  );
};
export default Calender;
