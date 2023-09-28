import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Creating a cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }

  //If cabin creation is successfull, we then upload the cabin image in the storage bucket

  const { error: imageStoreError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //If ther's an error in uploading the cabin image we will delete the created cabin
  if (imageStoreError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(imageStoreError);
    throw new Error(
      "Cabin image could not be uploaded and cabin could not be created!"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted!");
  }

  return data;
}
