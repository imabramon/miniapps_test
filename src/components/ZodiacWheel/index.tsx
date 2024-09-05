import React, {
  useState,
  useRef,
  useEffect,
  PropsWithChildren,
  FC,
} from "react";
import { motion, useAnimation } from "framer-motion";
import "./style.css";
import { ZodiacSector } from "./ZodiacSeector";
import _ from "lodash";

const zodiacSigns = [
  "♈️",
  "♉️",
  "♊️",
  "♋️",
  "♌️",
  "♍️",
  "♎️",
  "♏️",
  "♐️",
  "♑️",
  "♒️",
  "♓️",
];

interface ZodiacWheelProps {
  onSelectSign: (sign: string) => void;
}

const getIndexByRotation = (rotation: number) => {
  const normilizeRotation = rotation % 360;

  if (normilizeRotation < 0) {
    return 12 + _.floor(normilizeRotation / 30);
  }

  return _.floor(normilizeRotation / 30);
};

const ZodiacWheel: React.FC<ZodiacWheelProps> = ({ onSelectSign }) => {
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const controlsCenter = useAnimation();

  const handleWheel = (event: React.WheelEvent) => {
    const newRotation = rotation + (event.deltaY > 0 ? 30 : -30);
    setRotation(newRotation);
    controls.start({
      rotate: -newRotation,
      transition: { duration: 0.5, ease: "easeOut" },
    });
    controlsCenter.start({
      rotate: newRotation,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  console.log("index", getIndexByRotation(rotation));

  return (
    <div
      style={{
        transform: `rotate(-90deg)`,
      }}
      className="zodiac-wheel"
    >
      <motion.div
        className="zodiac-wheel__container"
        animate={controls}
        onWheel={handleWheel}
      >
        {zodiacSigns.map((zodiac, index) => (
          <ZodiacSector rotation={rotation} sector={index} sectorsAmount={12}>
            {zodiac}
          </ZodiacSector>
        ))}
        <div
          style={{
            transform: "rotate(90deg)",
          }}
        >
          <motion.div animate={controlsCenter}>
            {zodiacSigns[getIndexByRotation(rotation)]}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ZodiacWheel;
