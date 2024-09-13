import { format } from "date-fns";
import { FC, useEffect, useState } from "react";
import { makeMocker } from "../../api";
import "./style.css";
import { AnimatePresence, motion } from "framer-motion";
import Popup from "reactjs-popup";
import { useClickAway } from "@uidotdev/usehooks";

const getHoroscope = makeMocker();

interface HoroscopePopupProps {
  isOpen: boolean;
  onClose: () => void;
  sign: string;
  date: Date;
}

export const HoroscopePopup: FC<HoroscopePopupProps> = ({
  isOpen,
  onClose,
  sign,
  date,
}) => {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(isOpen);

  const popupref = useClickAway<HTMLDivElement>(() => {
    if (isOpen) {
      handleClose();
    }
  });

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const formatDate = format(date, "yyyy-MM-d");
      (async () => {
        const horoscope = await getHoroscope(sign, formatDate);
        if (horoscope) {
          setText(horoscope);
        } else {
          setText("Something went wrong");
        }
      })();
    }
  }, [isOpen, sign, date]);

  const handleClose = () => {
    setIsVisible(false); // Запускаем анимацию выхода

    setTimeout(() => {
      onClose(); // Закрываем попап после завершения анимации
    }, 300); // Время должно совпадать с длительностью анимации
  };

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5, // Длительность анимации
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3, // Длительность анимации выхода
      },
    },
  };

  return (
    <Popup open={isOpen}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={popupref}
            className="popup"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1>Ваш гороскоп</h1>
            <p>{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Popup>
  );
};
