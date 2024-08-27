import { useState, useEffect } from "react";
import { initTelegram } from "../utils/telegram";

export const useTelegramInit = () => {
  const [inited, setInited] = useState(false);

  useEffect(() => {
    setInited(initTelegram());
  }, []);

  return inited;
};
