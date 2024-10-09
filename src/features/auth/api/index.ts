import supabase from "@libs/supabase";

export const signUpUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  });
};

export const resendConfirmationEmail = async (email: string) => {
  return await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${import.meta.env.VITE_SUPABASE_URL}/welcome`
    }
  });
};

export const logInUserWithPassword = async (
  email: string,
  password: string
) => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

export const logout = async () => {
  return await supabase.auth.signOut();
};
