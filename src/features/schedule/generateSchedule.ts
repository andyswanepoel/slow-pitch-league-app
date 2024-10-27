import shuffle from "lodash/shuffle";
const locations = ["East Diamond", "Center Diamond", "West Diamond"];
// This will be spread into the setHours method so it is hours, minutes, seconds

type Time = [number, number, number];

const times: Record<"morning" | "afternoon", Time[]> = {
  morning: [
    [10, 0, 0],
    [11, 30, 0]
  ],
  afternoon: [
    [13, 0, 0],
    [14, 30, 0]
  ]
};

interface IGameSlot {
  time: Time;
  location: string;
}

interface IGame {
  game_time: Date;
  location: string;
  home_team_id: string;
  away_team_id: string;
}
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

// Number will be the hours in 24 hours, so like 13 for 1pm, 10 for 10am, etc.
function generateTimeLocationPairs(
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

function createMatchUps(teams: string[]) {
  const matchUps = [];

  const firstGroup = teams.slice(0, teams.length / 2);
  const secondGroup = teams.slice(teams.length / 2, teams.length);

  for (let game = 0; game < 2; game++) {
    for (let i = 0; i < teams.length / 2; i++) {
      let home_team_id;
      let away_team_id;
      if (game % 2 === 0) {
        home_team_id = firstGroup[i];
        away_team_id = secondGroup[i];
      } else {
        home_team_id = secondGroup[i];
        away_team_id = firstGroup[i];
      }

      matchUps.push({ home_team_id, away_team_id });
    }
    const teamToMove = secondGroup.pop();
    if (teamToMove) secondGroup.unshift(teamToMove);
  }

  return matchUps;
}

const sortGameSlotsByTime = (a: IGameSlot, b: IGameSlot) =>
  timeToSeconds(a.time) - timeToSeconds(b.time);

export function generateSchedule(teams: string[], weeks: Date[]): IGame[] {
  const tempTeams = [...teams];
  if (tempTeams.length % 2 == 1) {
    tempTeams.push("BYE");
  }

  const schedule = [];
  const numTeams = tempTeams.length;

  // If we get the weekly slots, we can just go through the games and put them in a slot
  const morningGameSlots = generateTimeLocationPairs(
    times.morning,
    locations
  ).sort(sortGameSlotsByTime);

  const afternoonGameSlots = generateTimeLocationPairs(
    times.afternoon,
    locations
  ).sort(sortGameSlotsByTime);

  for (const week of weeks) {
    // Check for overlapping game times
    let earlyTimesIdx = 0;
    let earlyTimes = morningGameSlots.slice(0, morningGameSlots.length / 2);
    let lateTimesIdx = 0;
    let lateTimes = morningGameSlots.slice(
      morningGameSlots.length / 2,
      morningGameSlots.length
    );

    const teamsWithEarlyGames = new Set();
    const teamsWithLateGames = new Set();

    const randomizedTeams = shuffle(tempTeams);
    const half = Math.floor(numTeams / 2);
    const morningTeams = randomizedTeams.slice(0, half);
    const afternoonTeams = randomizedTeams.slice(half, numTeams);

    // ensure even teams in each group
    if (afternoonTeams.length % 2 !== 0) {
      const matchUpToMove = afternoonTeams.pop();
      if (matchUpToMove) morningTeams.push(matchUpToMove);
    }

    const morningMatchUps = createMatchUps(morningTeams);
    const afternoonMatchUps = createMatchUps(afternoonTeams);

    for (const morningMatchUp of morningMatchUps) {
      let game: IGame;

      // Lets first try fill the afternoon games
      // Check if we've filled all slots
      const lateSlotsAvailable = lateTimesIdx < lateTimes.length;

      if (lateSlotsAvailable) {
        const { location, time } = lateTimes[lateTimesIdx];
        const game_time = new Date(week);
        game_time.setHours(...time);

        if (
          !teamsWithLateGames.has(morningMatchUp.home_team_id) &&
          !teamsWithLateGames.has(morningMatchUp.away_team_id)
        ) {
          game = { ...morningMatchUp, location, game_time };
          teamsWithLateGames.add(morningMatchUp.home_team_id);
          teamsWithLateGames.add(morningMatchUp.away_team_id);
          lateTimesIdx++;
        } else {
          const { location, time } = earlyTimes[earlyTimesIdx];
          const game_time = new Date(week);
          game_time.setHours(...time);
          game = {
            ...morningMatchUp,
            location,
            game_time
          };
          teamsWithEarlyGames.add(morningMatchUp.home_team_id);
          teamsWithEarlyGames.add(morningMatchUp.away_team_id);
          earlyTimesIdx++;
        }
      } else {
        const { location, time } = earlyTimes[earlyTimesIdx];
        const game_time = new Date(week);
        game_time.setHours(...time);
        game = {
          ...morningMatchUp,
          location,
          game_time
        };
        teamsWithEarlyGames.add(morningMatchUp.home_team_id);
        teamsWithEarlyGames.add(morningMatchUp.away_team_id);
        earlyTimesIdx++;
      }
      schedule.push(game);
    }

    // Reset to do afternoon games
    // --- Early
    earlyTimesIdx = 0;
    earlyTimes = afternoonGameSlots.slice(0, afternoonGameSlots.length / 2);
    teamsWithEarlyGames.clear();

    // --- Late
    lateTimesIdx = 0;
    lateTimes = afternoonGameSlots.slice(
      afternoonGameSlots.length / 2,
      afternoonGameSlots.length
    );
    teamsWithLateGames.clear();

    for (const afternoonMatchUp of afternoonMatchUps) {
      let game: IGame;

      // Lets first try fill the afternoon games
      // Check if we've filled all slots
      const lateSlotsAvailable = lateTimesIdx < lateTimes.length;

      if (lateSlotsAvailable) {
        const { location, time } = lateTimes[lateTimesIdx];
        const game_time = new Date(week);
        game_time.setHours(...time);

        if (
          !teamsWithLateGames.has(afternoonMatchUp.home_team_id) &&
          !teamsWithLateGames.has(afternoonMatchUp.away_team_id)
        ) {
          game = { ...afternoonMatchUp, location, game_time };
          teamsWithLateGames.add(afternoonMatchUp.home_team_id);
          teamsWithLateGames.add(afternoonMatchUp.away_team_id);
          lateTimesIdx++;
        } else {
          const { location, time } = earlyTimes[earlyTimesIdx];
          const game_time = new Date(week);
          game_time.setHours(...time);
          game = {
            ...afternoonMatchUp,
            location,
            game_time
          };
          teamsWithEarlyGames.add(afternoonMatchUp.home_team_id);
          teamsWithEarlyGames.add(afternoonMatchUp.away_team_id);
          earlyTimesIdx++;
        }
      } else {
        const { location, time } = earlyTimes[earlyTimesIdx];
        const game_time = new Date(week);
        game_time.setHours(...time);
        game = {
          ...afternoonMatchUp,
          location,
          game_time
        };
        teamsWithEarlyGames.add(afternoonMatchUp.home_team_id);
        teamsWithEarlyGames.add(afternoonMatchUp.away_team_id);
        earlyTimesIdx++;
      }
      schedule.push(game);
    }
  }
  return schedule;
}
