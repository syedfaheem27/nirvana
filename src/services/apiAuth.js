import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        value: {
          fullName,
          avatar: "",
        },
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

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

export async function updateUser({ fullName, avatar, password }) {
  let updatedData;
  //Since password updation and user data updation happens separately
  //Therefore, only one of them will have data at a point

  //1. Update password or fullName

  if (fullName)
    updatedData = {
      data: {
        fullName,
      },
    };

  if (password) updatedData = { password };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  //2.Upload avatar to the bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3.Update avatar in the user
  const { data: updatedUser, error: finalError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (finalError) throw new Error(finalError.message);

  return updatedUser;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
