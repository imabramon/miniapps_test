import { motion, useAnimation } from "framer-motion";
import React, { FC, PropsWithChildren, useEffect, useMemo } from "react";
import _ from "lodash";

interface ZodiacSectorProps {
  rotation: number;
  sector: number;
  sectorsAmount: number;
  onClick: (sector: number) => void;
  onMouseDown: React.MouseEventHandler;
  onTouchStart: React.TouchEventHandler;
}

export const ZodiacSector: FC<PropsWithChildren<ZodiacSectorProps>> = ({
  rotation,
  children,
  sectorsAmount,
  sector,
  onClick: clickHandler,
  onMouseDown,
  onTouchStart,
}) => {
  const controls = useAnimation();

  const delta = useMemo(() => {
    return _.floor(360 / sectorsAmount);
  }, [sectorsAmount]);

  useEffect(() => {
    controls.start({
      rotate: 90 + rotation - delta * sector,
    });
  }, [rotation, controls, sector]);

  return (
    <div
      className="zodiac-wheel__sector"
      style={{
        transform: `rotate(${delta * sector}deg)`,
      }}
      onClick={() => clickHandler(sector)}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <motion.div animate={controls}>{children}</motion.div>
    </div>
  );
};
