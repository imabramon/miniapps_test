import { FC } from "react";
import ZodiacWheel from "./ZodiacWheel";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Telegram: any;
  }
}

const App: FC = () => {
  try {
    window.Telegram.WebApp.isVerticalSwipesEnabled = false;
  } catch {
    console.log("something went wrong");
  }

  return (
    <ZodiacWheel
      onSelectSign={(sign) => {
        console.log(sign);
      }}
    />
  );
};

export default App;
