import React, { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./style.css";
import { ZodiacSector } from "./ZodiacSeector";
import _ from "lodash";

const zodiacSigns = [
  { symbol: "♈️", name: "Aries" },
  { symbol: "♉️", name: "Taurus" },
  { symbol: "♊️", name: "Gemini" },
  { symbol: "♋️", name: "Cancer" },
  { symbol: "♌️", name: "Leo" },
  { symbol: "♍️", name: "Virgo" },
  { symbol: "♎️", name: "Libra" },
  { symbol: "♏️", name: "Scorpio" },
  { symbol: "♐️", name: "Sagittarius" },
  { symbol: "♑️", name: "Capricorn" },
  { symbol: "♒️", name: "Aquarius" },
  { symbol: "♓️", name: "Pisces" },
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

const getCenter = (ref: React.RefObject<HTMLDivElement>) => {
  if (!ref.current) return { x: 0, y: 0 };
  const rect = ref.current.getBoundingClientRect();

  // Вычисляем центр элемента
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return { x: centerX, y: centerY };
};

type Point = {
  x: number;
  y: number;
};

const getAngle = (origin: Point, first: Point, second: Point): number => {
  const vectorA = {
    x: first.x - origin.x,
    y: first.y - origin.y,
  };

  const vectorB = {
    x: second.x - origin.x,
    y: second.y - origin.y,
  };

  // Скалярное произведение A · B
  const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;

  // Длины векторов |A| и |B|
  const magnitudeA = Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2);
  const magnitudeB = Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2);

  // Косинус угла между векторами
  const cosTheta = dotProduct / (magnitudeA * magnitudeB);

  // Угол в радианах
  const angleRadians = Math.acos(Math.min(Math.max(cosTheta, -1), 1));

  // Преобразуем радианы в градусы
  let angleDegrees = (angleRadians * 180) / Math.PI;

  // Определяем направление с помощью векторного произведения
  const crossProduct = vectorA.x * vectorB.y - vectorA.y * vectorB.x;

  // Если векторное произведение отрицательно, угол по часовой стрелке, делаем его отрицательным
  if (crossProduct < 0) {
    angleDegrees = -angleDegrees;
  }

  return angleDegrees;
};

const withMousePoint =
  <T,>(fn: (point: Point) => T) =>
  (event: React.MouseEvent) => {
    const point = { x: event.clientX, y: event.clientY };
    return fn(point);
  };

const withFirstTouchPoint =
  <T,>(fn: (point: Point) => T) =>
  (event: React.TouchEvent) => {
    const touch = event.touches[0];
    const point = { x: touch.clientX, y: touch.clientY };
    return fn(point);
  };

const roundToNearestDelta = (angle: number, delta: number): number => {
  return Math.round(angle / delta) * delta;
};

const ZodiacWheel: React.FC<ZodiacWheelProps> = ({
  onSelectSign = () => {},
}) => {
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const controlsCenter = useAnimation();
  const isDragging = useRef(false);
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const startAngle = useRef(0);
  const conatiner = useRef<HTMLDivElement>(null);
  const overflow = useRef<string>("");

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

  const handleDragStart = (point: Point) => {
    if (!isDragging.current) {
      overflow.current = document.body.style.overflow;
      //document.body.style.overflow = "hidden";
      isDragging.current = true;
      startPoint.current = point;
      startAngle.current = rotation;
    }
  };

  const handleDragMove = (point: Point) => {
    if (isDragging.current) {
      if (conatiner.current && startPoint.current) {
        const angle = -getAngle(
          getCenter(conatiner),
          startPoint.current,
          point
        );

        rotate(startAngle.current + angle);
      }
    }
  };

  const handleDragEnd = () => {
    if (isDragging.current) {
      document.body.style.overflow = overflow.current;
      isDragging.current = false;
      rotate(roundToNearestDelta(rotation, delta));
    }
  };

  const handleMouseDown = withMousePoint(handleDragStart);

  const handleMouseMove = withMousePoint(handleDragMove);

  const handleTouchStart = withFirstTouchPoint(handleDragStart);

  const handleTouchMove = withFirstTouchPoint(handleDragMove);

  return (
    <div
      style={{
        transform: `rotate(-90deg)`,
      }}
      className="zodiac-wheel"
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
      ref={conatiner}
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
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {zodiac.symbol}
          </ZodiacSector>
        ))}
        <div
          style={{
            transform: "rotate(90deg)",
          }}
        >
          <motion.div
            animate={controlsCenter}
            onClick={() =>
              onSelectSign(zodiacSigns[getIndexByRotation(rotation)].name)
            }
          >
            {zodiacSigns[getIndexByRotation(rotation)].symbol}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ZodiacWheel;
