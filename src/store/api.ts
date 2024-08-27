import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Lang, Period, ReqResLanguage, Zodiac, ZodiacInfo } from "../types";

export const langToLanguage: Record<Lang, ReqResLanguage> = {
  en: "translated",
  ru: "original",
};

export const zodiacApi = createApi({
  reducerPath: "zodiacs",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://poker247tech.ru/get_horoscope/",
  }),
  endpoints: (build) => ({
    getAllZodiacInfo: build.query<ZodiacInfo, [ Lang, Period]>({   
      query: ([lang, period]) => ({
        url: "",
        method: "POST",
        body: { language: langToLanguage[lang], period },
      }),
    }),
  }),
});

export const { useGetAllZodiacInfoQuery} = zodiacApi;

type Options = Parameters<typeof useGetAllZodiacInfoQuery>[1]

export const useGetZodiacInfoQuery = ([sign, lang, period]: [Zodiac, Lang, Period], options: Options = {}) => {
    return useGetAllZodiacInfoQuery([lang, period], {
        selectFromResult: ({data}) => {
            return {data: data?.horoscope?.[sign]}
        },
        ...options
    })
}
