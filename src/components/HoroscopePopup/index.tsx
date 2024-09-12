import { format } from "date-fns";
import { FC, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { makeMocker } from "../../api";
import "./style.css";

const getHoroscope = makeMocker();

interface HoroscopePopupProps {
  isOpen: boolean;
  onClose: () => void;
  sign: string;
  date: Date;
}

export const HoroscopePopup: FC<HoroscopePopupProps> = ({
  isOpen,
  onClose,
  sign,
  date,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (isOpen) {
      const formatDate = format(date, "yyyy-MM-d");
      (async () => {
        console.log(formatDate);
        const horoscope = await getHoroscope(sign, formatDate);
        if (horoscope) {
          setText(horoscope);
        } else {
          setText("Something went wrong");
        }
      })();
    }
  }, [isOpen, sign, date]);

  return (
    <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
      <div className="popup">
        <h1>Horoscope</h1>
        <p>{text}</p>
      </div>
    </Popup>
  );
};
