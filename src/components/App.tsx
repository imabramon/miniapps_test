import { FC } from "react";
import { Zodiac } from "../types";
import { Flex, List, Select, Typography } from "antd";
import { ZodiacCard } from "./ZodiacCard";
import { useLanguage } from "../store/app";

const zodiacs: Zodiac[] = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const AppHeader = () => {
    const [lang, setLang] = useLanguage()
  return (
    <Flex justify="space-between" align="center">
      <Typography.Text>Выберете язык:</Typography.Text>
      <Select
        style={{ width: "fit-content", minWidth: "100px" }}
        value={lang}
        onChange={setLang}
        options={[
          {
            value: "ru",
            label: "Русский",
          },
          {
            value: "en",
            label: "English",
          },
        ]}
      />
    </Flex>
  );
};

const App: FC = () => {
  return (
    <List
      header={<AppHeader />}
      dataSource={zodiacs}
      renderItem={(zodiac, key) => (
        <List.Item style={{ paddingBottom: "16px" }}>
          <ZodiacCard sign={zodiac} key={key} />
        </List.Item>
      )}
    />
  );
};

export default App;
