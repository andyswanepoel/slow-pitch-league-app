import { IGame, IGameSlot, IMatchUp } from "../types";

// Helper for slot allocation with check to avoid duplicate early/late slots
export function assignMatchUpsToSlots(
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
