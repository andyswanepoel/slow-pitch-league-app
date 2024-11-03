import shuffle from "lodash/shuffle";
import { getWeeks } from "./getWeeks";
import type { IGame, IGameSlot, Time } from "../types";
import { generateTimeLocationPairs } from "./generateTimeLocationPairs";
import { GAME_LOCATIONS, GAME_TIMES } from "../constants";
import { createMatchUps } from "./createMatchUps";
import { assignMatchUpsToSlots } from "./assignMatchUpsToSlots";

/**
 *
 * Every team plays two games per week.
 * Teams ONLY play in early OR late slots each week
 * Each game is either early or late, with no overlap.
 * Locations are rotated to ensure equal distribution.
 * All teams play every week.
 */

// Convert [hour, minute, second] array into total seconds for comparison
function timeToSeconds(time: Time) {
  return time[0] * 3600 + time[1] * 60 + time[2];
}

const sortGameSlotsByTime = (a: IGameSlot, b: IGameSlot) =>
  timeToSeconds(a.time) - timeToSeconds(b.time);

export function generateSchedule(
  teams: string[],
  startDate: Date,
  endDate: Date
): IGame[] {
  const weeks: Date[] = getWeeks(startDate, endDate);
  const tempTeams = [...teams];
  if (tempTeams.length % 2 == 1) {
    tempTeams.push("BYE");
  }

  const schedule = [];
  const numTeams = tempTeams.length;

  // If we get the weekly slots, we can just go through the games and put them in a slot
  const morningGameSlots = generateTimeLocationPairs(
    GAME_TIMES.morning,
    GAME_LOCATIONS
  ).sort(sortGameSlotsByTime);

  const afternoonGameSlots = generateTimeLocationPairs(
    GAME_TIMES.afternoon,
    GAME_LOCATIONS
  ).sort(sortGameSlotsByTime);

  for (const week of weeks) {
    const randomizedTeams = shuffle(tempTeams);
    const half = Math.floor(numTeams / 2);
    const morningTeams = randomizedTeams.slice(0, half);
    const afternoonTeams = randomizedTeams.slice(half, numTeams);

    // ensure even teams in each group
    if (afternoonTeams.length % 2 !== 0) {
      const matchUpToMove = morningTeams.pop();
      if (matchUpToMove) afternoonTeams.push(matchUpToMove);
    }

    const morningMatchUps = createMatchUps(morningTeams);
    const afternoonMatchUps = createMatchUps(afternoonTeams);

    const morningEarlySlots = morningGameSlots.slice(
      0,
      morningGameSlots.length / 2
    );
    const morningLateSlots = morningGameSlots.slice(
      morningGameSlots.length / 2,
      morningGameSlots.length
    );
    const morningGames = assignMatchUpsToSlots(
      morningMatchUps,
      morningEarlySlots,
      morningLateSlots,
      week
    );

    const afternoonEarlySlots = afternoonGameSlots.slice(
      0,
      afternoonGameSlots.length / 2
    );
    const afternoonLateSlots = afternoonGameSlots.slice(
      afternoonGameSlots.length / 2,
      afternoonGameSlots.length
    );
    const afternoonGames = assignMatchUpsToSlots(
      afternoonMatchUps,
      afternoonEarlySlots,
      afternoonLateSlots,
      week
    );
    schedule.push(...morningGames, ...afternoonGames);
  }
  return schedule.sort(
    (a, b) => new Date(a.game_time).getTime() - new Date(b.game_time).getTime()
  );
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
