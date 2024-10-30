import supabase from "@libs/supabase";
import { IGame } from "../types";
// const baseUrl = import.meta.env.VITE_BASE_URL;

export const getAllGames = async () => {
  const { data, error } = await supabase.from("games").select("*");
  if (error) {
    // @TODO: handle error
  }

  return data ?? [];
};

export const getActiveSeasons = async () => {
  const currentDate = new Date().toISOString();
  const { data, error } = await supabase
    .from("seasons")
    .select("id,start_date,end_date")
    .lte("start_date", currentDate)
    .gte("end_date", currentDate);

  if (error) {
    // @TODO: handle error
  }

  return data ?? [];
};

export const getGamesBySeason = async (seasonId: string) => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("season_id", seasonId)
    .order("game_time");

  if (error) {
    // @TODO: handle error
  }

  return data ?? [];
};

export const getSeasonByDates = async (
  start_date: string,
  end_date: string
) => {
  const { data, error } = await supabase
    .from("seasons")
    .select("id")
    .eq("start_date", start_date)
    .eq("end_date", end_date);

  if (error) {
    throw new Error(error.message);
  }
  return data[0].id;
};

export const addGamesToSeason = async (games: IGame[], season_id: string) => {
  const gamesToInsert = games.map(game => ({
    ...game,
    season_id,
    game_time: game.game_time.toISOString()
  }));

  const { error } = await supabase.from("games").insert(gamesToInsert);

  if (error) {
    // @TODO: handle error in FE
    throw new Error(error.message);
  }
};

export interface ITeam {
  id: string;
  name: string;
}

export const getActiveTeams = async (): Promise<ITeam[]> => {
  const { data, error } = await supabase
    .from("teams")
    .select("id,name")
    .eq("archived", false);

  if (error) {
    // @TODO: handle error
  }

  return data ?? [];
};

export const createSeason = async (start_date: string, end_date: string) => {
  const { error } = await supabase
    .from("seasons")
    .insert({ start_date, end_date });

  if (error) {
    // @TODO: handle error
    throw new Error(error.message);
  }
};
