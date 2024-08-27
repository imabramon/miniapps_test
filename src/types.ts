export type Zodiac =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type Lang = "en" | "ru"

export type Period = "today" | "tomorrow"

export type ReqResLanguage = "translated" | "original"

export type ZodiacInfo = {
    sign: Zodiac,
    language: ReqResLanguage,
    period: Period,
    horoscope: Record<Zodiac, string>
}