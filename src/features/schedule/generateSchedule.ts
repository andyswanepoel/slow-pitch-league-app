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

interface IMatchUp {
  home_team_id: string;
  away_team_id: string;
}
interface IGameSlot {
  time: Time;
  location: string;
}

interface IGame extends IMatchUp {
  game_time: Date;
  location: string;
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

// Helper for slot allocation with check to avoid duplicate early/late slots
function assignMatchUpsToSlots(
  matchUps: IMatchUp[],
  earlySlots: IGameSlot[],
  lateSlots: IGameSlot[],
  week: Date
): IGame[] {
  const games: IGame[] = [];
  const teamsWithEarlyGames = new Set();
  const teamsWithLateGames = new Set();
  let earlyTimesIdx = 0;
  let lateTimesIdx = 0;
  for (const matchup of matchUps) {
    let game: IGame;

    // Lets first try fill the afternoon games
    // Check if we've filled all slots
    const canAddToLateSlot = lateTimesIdx < lateSlots.length;

    if (canAddToLateSlot) {
      const { location, time } = lateSlots[lateTimesIdx];
      const game_time = new Date(week);
      game_time.setHours(...time);

      if (
        !teamsWithLateGames.has(matchup.home_team_id) &&
        !teamsWithLateGames.has(matchup.away_team_id)
      ) {
        game = { ...matchup, location, game_time };
        teamsWithLateGames.add(matchup.home_team_id);
        teamsWithLateGames.add(matchup.away_team_id);
        lateTimesIdx++;
      } else {
        const { location, time } = earlySlots[earlyTimesIdx];
        const game_time = new Date(week);
        game_time.setHours(...time);
        game = {
          ...matchup,
          location,
          game_time
        };
        teamsWithEarlyGames.add(matchup.home_team_id);
        teamsWithEarlyGames.add(matchup.away_team_id);
        earlyTimesIdx++;
      }
    } else {
      const { location, time } = earlySlots[earlyTimesIdx];
      const game_time = new Date(week);
      game_time.setHours(...time);
      game = {
        ...matchup,
        location,
        game_time
      };
      teamsWithEarlyGames.add(matchup.home_team_id);
      teamsWithEarlyGames.add(matchup.away_team_id);
      earlyTimesIdx++;
    }
    games.push(game);
  }

  return games;
}

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
  return schedule;
}
