import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TelegramApp from "./components/TelegramApp.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import './style.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <TelegramApp />
    </Provider>
  </StrictMode>
);
