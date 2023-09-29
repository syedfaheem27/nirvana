import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin, editId) {
  //Checking if there is an image path and changing the path accordingly
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1.Edit/Create Cabin
  let query = supabase.from("cabins");

  // A. Creating a cabin
  if (!editId) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. Editing a cabin
  if (editId)
    query = query.update({ ...newCabin, image: imagePath }).eq("id", editId);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }

  //Cabin creation successfull => store image in the bucket
  const { error: imageStoreError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //Cabin creation erronous => delete the created cabin
  if (imageStoreError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(imageStoreError);
    throw new Error(
      "Cabin image could not be uploaded and cabin could not be created!"
    );
  }

  //To take a look at the returned data after creating a cabin
  // console.log(data);
  return data;
}

export async function deleteCabin(id) {
  console.log(id);
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted!");
  }

  return data;
}
