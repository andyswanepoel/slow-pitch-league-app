export function createMatchUps(teams: string[]) {
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
