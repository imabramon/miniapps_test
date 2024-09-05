import { FC } from "react";
import ZodiacWheel from "./ZodiacWheel";

const App: FC = () => {
  return (
    <ZodiacWheel
      onSelectSign={(sign) => {
        console.log(sign);
      }}
    />
  );
};

export default App;
