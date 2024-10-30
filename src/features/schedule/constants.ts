import type { Time } from "./types";

export const STAT_HOLIDAYS_ONTARIO = [
  new Date("2025-01-01").toISOString(), // New Year's Day (Wednesday)
  new Date("2025-02-17").toISOString(), // Family Day (Monday)
  new Date("2025-03-28").toISOString(), // Good Friday (Friday)
  new Date("2025-05-19").toISOString(), // Victoria Day (Monday)
  new Date("2025-07-01").toISOString(), // Canada Day (Tuesday)
  new Date("2025-08-04").toISOString(), // Civic Holiday (Monday)
  new Date("2025-09-01").toISOString(), // Labour Day (Monday)
  new Date("2025-10-13").toISOString(), // Thanksgiving Day (Monday)
  new Date("2025-12-25").toISOString(), // Christmas Day (Thursday)
  new Date("2025-12-26").toISOString() // Boxing Day (Friday)
];

export const GAME_TIMES: Record<"morning" | "afternoon", Time[]> = {
  morning: [
    [10, 0, 0],
    [11, 30, 0]
  ],
  afternoon: [
    [13, 0, 0],
    [14, 30, 0]
  ]
};

export const GAME_LOCATIONS = [
  "East Diamond",
  "Center Diamond",
  "West Diamond"
];
