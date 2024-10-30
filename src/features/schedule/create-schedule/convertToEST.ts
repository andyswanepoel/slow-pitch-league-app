export function convertToEasternTime(date: Date) {
  const utcDate = new Date(date);
  return utcDate.toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "long", // e.g., "Sunday"
    year: "numeric", // e.g., "2024"
    month: "long", // e.g., "October"
    day: "numeric", // e.g., "27"
    hour: "numeric", // e.g., "11"
    minute: "2-digit", // e.g., "30"
    hour12: true // AM/PM format
  });
}
