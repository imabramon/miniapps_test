const getLang = ()=>{
   return window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code
}

export default getLang