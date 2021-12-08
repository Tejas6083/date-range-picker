import React, { useState } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(originalMoment);

const DatePicker = () => {
  const today = moment();

  const [calendar, setCalendar] = useState({
    dates: null,
    value: moment.range(today.clone().subtract(7, "days"), today.clone()),
    states: "",
    initialYear: new Date().getFullYear(),
    initialMonths: new Date().getMonth(),
    minimumDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
    maximumDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    start: moment
      .range(today.clone().subtract(7, "days"), today.clone())
      .start.format("YYYY-MM-DD"),
    end: moment
      .range(today.clone().subtract(7, "days"), today.clone())
      .end.format("YYYY-MM-DD"),
    showNewMonth: false
  });

  const stateDefinitions = {
    available: {
      // selectable: false,
      color: null,
      label: "Available"
    },
    enquire: {
      color: "#ffd200",
      label: "Enquire"
    },
    unavailable: {
      // selectable: false,
      color: "#ff80ff",
      label: "Unavailable"
    }
  };

  const dateRangePickerSelect = (range, states, dates, start, end, value) => {
    setCalendar({
      ...calendar,
      value: range,
      states: states,
      start: range.start.format("YYYY-MM-DD"),
      end: range.end.format("YYYY-MM-DD"),
      showNewMonth: false
    });
  };
  const displaySelectedDates = () => {
    return (
      <div className="text-center">
        <div className="d-inline-block text-bold color-blue">
          <p>
            Selected Start Date:{" "}
            <input
              value={`${calendar.start} - ${calendar.end}`}
              readOnly
              onClick={() => setCalendar({ ...calendar, showNewMonth: true })}
            />{" "}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>{displaySelectedDates()}</div>
      {calendar.showNewMonth && (
        <DateRangePicker
          selectionType="range"
          singleDateRange
          initialFromValue
          stateDefinitions={stateDefinitions}
          // dateStates={[]}
          defaultState="available"
          value={calendar.value}
          onSelect={dateRangePickerSelect}
          numberOfCalendars={2}
          initialMonth={calendar.initialMonths}
          initialYear={calendar.initialYear}
          minimumDate={calendar.minimumDate}
          maximumDate={calendar.maximumDate}
        />
      )}
    </div>
  );
};

export default DatePicker;
