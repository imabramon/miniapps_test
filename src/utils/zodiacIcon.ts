import { Zodiac } from "../types";

const emojiSymbolDictionary: Record<Zodiac, string> = {
    "aries": "♈",
    "taurus": "♉",
    "gemini": "♊",
    "cancer": "♋",
    "leo": "♌",
    "virgo": "♍",
    "libra": "♎",
    "scorpio": "♏",
    "sagittarius": "♐",
    "capricorn": "♑",
    "aquarius": "♒",
    "pisces": "♓",
  };

export const ZodiacIcon = (sign: Zodiac) => emojiSymbolDictionary[sign]