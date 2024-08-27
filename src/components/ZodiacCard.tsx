import { Flex, Select, CollapseProps, Collapse, Alert, Spin } from "antd";
import { FC, useState } from "react";
import { Lang, Period, Zodiac } from "../types";
import { useGetZodiacInfoQuery } from "../store/api";
import { useLanguage } from "../store/app";

const errorMessages: Record<Lang, string> = {
  en: "Something went wrong",
  ru: "Что-то пошло не так, попробуйте позже",
};

interface ZodiacContentProps {
  sign: Zodiac;
  period: Period;
}

const ZodiacContent: FC<ZodiacContentProps> = ({ sign, period }) => {
  const [lang] = useLanguage();
  const {
    data: horoscope,
    isFetching,
    isLoading,
    isError,
  } = useGetZodiacInfoQuery([sign, lang, period]);

  if (isFetching || isLoading) return <Spin />;

  if (!horoscope || isError)
    return <Alert message={errorMessages[lang]} showIcon />;

  return <p>{horoscope}</p>;
};

interface ZodiacHeaderProps{
    sign: Zodiac
    periodHandler: (period: Period) => void
}

const ZodiacHeader: FC<ZodiacHeaderProps> = ({ sign, periodHandler }) => {
  return (
    <Flex justify="space-between" align="center">
      <p>{sign}</p>
      <Select
        style={{ width: "fit-content", minWidth: "100px" }}
        onClick={(e) => e.stopPropagation()}
        defaultValue={"today"}
        options={[
          {
            value: "today",
            label: "today",
          },
          {
            value: "tomorrow",
            label: "tomorrow",
          },
        ]}
        onChange={periodHandler}
      />
    </Flex>
  );
};

interface ZodiacCardProps{
    sign: Zodiac
    key: number
}

export const ZodiacCard: FC<ZodiacCardProps> = ({ sign, key }) => {
  const [period, setPeriod] = useState<Period>("today");

  const items: CollapseProps["items"] = [
    {
      key,
      label: <ZodiacHeader sign={sign} periodHandler={setPeriod} />,
      children: <ZodiacContent sign={sign} period={period} />,
    },
  ];

  return <Collapse items={items} size="small" />;
};
