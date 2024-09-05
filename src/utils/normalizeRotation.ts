export const normilizeRotation = (angle: number) => {
  const normalizedAngle = angle % 360;
  return normalizedAngle < 0 ? normalizedAngle + 360 : normalizedAngle;
};
