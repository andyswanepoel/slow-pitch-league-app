import supabase from "@libs/supabase";

export const getSeasonStandings = async (seasonId: string) => {
  const { data, error } = await supabase.rpc("get_team_standings", {
    season_id: seasonId
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
