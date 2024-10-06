import supabase from "../supabase";

export const isAuthenticated = async () => {
  const { data } = await supabase.auth.getSession();

  console.log("@@@data: ", data);
  return !!data.session;
};
