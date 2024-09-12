import { FC, useState } from "react";
import ZodiacWheel from "../ZodiacWheel";
import { HoroscopePopup } from "../HoroscopePopup";
import { DatePicker } from "../DatePicker";
import "./style.css";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Telegram: any;
  }
}

const App: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [sign, selectSign] = useState("");
  const [date, changeDate] = useState(new Date());

  try {
    window.Telegram.WebApp.isVerticalSwipesEnabled = false;
  } catch {
    console.log("something went wrong");
  }

  return (
    <>
      <div className={"app"}>
        <span>Узнай свою судьбу</span>
        <ZodiacWheel
          onSelectSign={(sign) => {
            setOpen(true);
            selectSign(sign);
          }}
        />
        <DatePicker value={date} onChange={changeDate} />
      </div>
      <HoroscopePopup
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        sign={sign}
        date={date}
      />
    </>
  );
};

export default App;
