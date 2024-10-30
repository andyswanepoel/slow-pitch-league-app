import supabase from "@libs/supabase";

export const getUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .limit(1)
    .single();

  if (error) {
    // @TODO: handle error
  }

  return data;
};
