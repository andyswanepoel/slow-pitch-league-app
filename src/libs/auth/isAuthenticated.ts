import supabase from "../supabase";

export const isAuthenticated = async () => {
  const { data } = await supabase.auth.getSession();

  return !!data.session;
};
