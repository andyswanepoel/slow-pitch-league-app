import { STAT_HOLIDAYS_ONTARIO } from "../constants";

export function getDayName(date: Date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  // Use UTC methods to avoid local timezone issues
  const dayIndex = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ).getUTCDay();
  return daysOfWeek[dayIndex];
}

export function getWeeks(startDate: Date, endDate: Date) {
  const weeks = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    weeks.push(new Date(current));

    current.setDate(current.getDate() + 7);
  }

  // We  want to filter if the next day is in the STAT_HOLIDAYS_ONTARIO
  return weeks.filter(week => {
    const newDate = new Date(week);
    newDate.setDate(newDate.getDate() + 1);

    return !STAT_HOLIDAYS_ONTARIO.includes(newDate.toISOString());
  });
}
