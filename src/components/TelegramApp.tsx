import App from "./App";
import { useTelegramInit } from "../hooks/useTelegramInit";
import getLang from "../utils/getLang";
import { useLanguage } from "../store/app";
import { useEffect } from "react";

function TelegramApp() {
  const isInited = useTelegramInit();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLang] = useLanguage();

  useEffect(() => {
    if (isInited) {
      setLang(getLang());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInited]);

  if (!isInited) return "Loading....";

  return <App />;
}

export default TelegramApp;
