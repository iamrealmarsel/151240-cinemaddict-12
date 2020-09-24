export const convertTotalMinutesToHoursMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;

  return {hours, minutes};
};

export const deleteProperties = (object, ...properties) => {
  properties.forEach((prop) => {
    delete object[prop];
  });
};
