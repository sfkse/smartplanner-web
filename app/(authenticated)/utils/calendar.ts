export const calendarDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
export const calendaHours = [
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
];

export const CELL_HEIGHT = 30;

export const getCell = (startTime, startDate) => {
  const hourParts = startTime.split(":")[0].toString() + ":00";
  // data.day is in the format of 2024-10-12. We need to find the day of the week.
  const dayIndex = new Date(startDate).getDay();
  const day = calendarDays[dayIndex - 1];

  return document.getElementsByClassName(
    `cell-${day}-${hourParts}`
  ) as HTMLCollectionOf<HTMLElement>;
};

export const calculateDimensions = (cellToBeCreated, startTime, endTime) => {
  const startTimeParts = startTime.split(":");
  const startMinuteParts = parseInt(startTimeParts[1]);
  const left = cellToBeCreated[0].offsetLeft;
  const top =
    cellToBeCreated[0].offsetTop + (startMinuteParts / 15) * CELL_HEIGHT;

  // Calculate the height of the cell. Default height is 80px. We need to calculate the difference between the start and end time. Each hour is 80px. Each 15 minutes is 20px. Each 5 minutes is 10px.
  const start = startTime.split(":");
  const end = endTime.split(":");
  const startHour = parseInt(start[0]);
  const endHour = parseInt(end[0]);
  const startMinute = parseInt(start[1]);
  const endMinute = parseInt(end[1]);
  let hourDifference = endHour - startHour;
  let minuteDifference = endMinute - startMinute;
  if (minuteDifference < 0) {
    minuteDifference = 60 + minuteDifference;
    hourDifference -= 1;
  }
  const height =
    hourDifference * CELL_HEIGHT * 4 + (minuteDifference / 15) * CELL_HEIGHT;

  return { left, top, height };
};

