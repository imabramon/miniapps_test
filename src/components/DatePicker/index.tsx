import { FC } from "react";
import { default as DatePickerLib } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <DatePickerLib
      selected={value}
      onChange={(date) => date && onChange(date)}
    />
  );
};
