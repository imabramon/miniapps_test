import { FC } from "react";
import { Zodiac } from "../types";
import { List } from "antd";
import { ZodiacCard } from "./ZodiacCard";

const zodiacs: Zodiac[] = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const App: FC = () => {
  return (
    <List>
      {zodiacs.map((zodiac, key) => (
        <ZodiacCard sign={zodiac} key={key} />
      ))}
    </List>
  );
};

export default App;
