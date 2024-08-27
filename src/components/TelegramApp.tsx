import App from "./App";
import { useTelegramInit } from "../hooks/useTelegramInit";
import getLang from "../utils/getLang";
import { LangContext } from "../utils/langContext";

function TelegramApp() {
  const isInited = useTelegramInit();

  if (!isInited) return "Loading....";

  const lang = getLang();

  return (
    <LangContext.Provider value={lang}>
      <App />
    </LangContext.Provider>
  );
}

export default TelegramApp;
