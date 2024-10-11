import supabase from "@libs/supabase";
const baseUrl = import.meta.env.VITE_BASE_URL;

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
      },

      emailRedirectTo: `${baseUrl}/welcome`
    }
  });
};

export const resendConfirmationEmail = async (email: string) => {
  return await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${baseUrl}/welcome`
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

export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseUrl}/update-password`
  });
};

export const logout = async () => {
  return await supabase.auth.signOut();
};
