
export const convertTotalMinutesToHoursMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;
  return {hours, minutes};
};

