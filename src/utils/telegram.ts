/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
      Telegram: any;
    }
  }
  
  export const initTelegram = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      //window.Telegram.WebApp.initData()
      return true
    }

    return false
  };
  