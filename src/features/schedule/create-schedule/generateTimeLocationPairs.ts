import { IGameSlot, Time } from "../types";

// Number will be the hours in 24 hours, so like 13 for 1pm, 10 for 10am, etc.
export function generateTimeLocationPairs(
  times: Time[],
  locations: string[]
): IGameSlot[] {
  const pairs: { time: Time; location: string }[] = [];

  times.forEach(time => {
    locations.forEach(location => {
      pairs.push({ time, location });
    });
  });

  return pairs;
}
