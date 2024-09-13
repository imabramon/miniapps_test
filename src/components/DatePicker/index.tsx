import { FC } from "react";
import { default as DatePickerLib } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <DatePickerLib
      className="date_picker"
      selected={value}
      onChange={(date) => date && onChange(date)}
    />
  );
};
