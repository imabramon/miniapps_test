import React, { useState } from "react";
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
  const intRotation = _.floor(normilizeRotation / 30);

  if (normilizeRotation < 0) {
    return 12 + intRotation;
  }

  return intRotation;
};

function minDistance(fromSector: number, toSector: number, sectorsCount = 12) {
  const clockwiseDistance =
    (toSector - fromSector + sectorsCount) % sectorsCount;

  const counterClockwiseDistance =
    (fromSector - toSector + sectorsCount) % sectorsCount;

  return clockwiseDistance <= counterClockwiseDistance
    ? clockwiseDistance
    : -counterClockwiseDistance;
}

const ZodiacWheel: React.FC<ZodiacWheelProps> = ({
  onSelectSign = () => {},
}) => {
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const controlsCenter = useAnimation();
  const delta = 30;

  const rotate = (newRotation: number) => {
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

  const handleWheel = (event: React.WheelEvent) => {
    const newRotation = rotation + (event.deltaY > 0 ? delta : -delta);
    rotate(newRotation);
  };

  const rotateToSign = (sector: number) => {
    const currentIndex = getIndexByRotation(rotation);
    const newRotation = rotation + minDistance(currentIndex, sector) * delta;
    rotate(newRotation);
  };

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
          <ZodiacSector
            rotation={rotation}
            sector={index}
            sectorsAmount={12}
            onClick={rotateToSign}
          >
            {zodiac}
          </ZodiacSector>
        ))}
        <div
          style={{
            transform: "rotate(90deg)",
          }}
        >
          <motion.div animate={controlsCenter} onClick={() => onSelectSign("")}>
            {zodiacSigns[getIndexByRotation(rotation)]}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ZodiacWheel;
