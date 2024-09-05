import { motion, useAnimation } from "framer-motion";
import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import _ from "lodash";

interface ZodiacSectorProps {
  rotation: number;
  sector: number;
  sectorsAmount: number;
}

export const ZodiacSector: FC<PropsWithChildren<ZodiacSectorProps>> = ({
  rotation,
  children,
  sectorsAmount,
  sector,
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
    >
      <motion.div animate={controls}>{children}</motion.div>
    </div>
  );
};
