import supabase from "./supabase";
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  //Getting a session if there is any
  const { data: session } = await supabase.auth.getSession();

  //If there's no session => user is not logged in
  if (!session.session) return null;

  //If there is a session, we can get the user from supabase
  //We could have gotten the user from the session itself but it is
  //considered safe to fetch the user again

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
