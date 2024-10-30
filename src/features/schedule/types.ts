export type Time = [number, number, number];

export interface IMatchUp {
  home_team_id: string;
  away_team_id: string;
}

export interface IGameSlot {
  time: Time;
  location: string;
}

export interface IGame extends IMatchUp {
  game_time: Date;
  location: string;
}
