import supabase from "./supabase";

import { supabaseUrl } from "./supabase";
const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded .");
  }

  return data;
};

export default getCabins;

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log("image name is : " + imageName);
  console.log("image ath is : " + imagePath);
  console.log("subase url : " + supabaseUrl);

  let query = supabase.from("cabins");
  // 1 .create and edit the new cabin in the database

  //A Create a new cabin
  if (!id) query =query.insert([{ ...newCabin, image: imagePath }]);

  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created .");
  }

  // 2. Check if image upload is needed
  if (hasImagePath) return data;

  // 2.1upload the image to storage bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //3 delete the cabin if image upload fails
  if (storageError) {
    console.error(storageError);

    await supabase.from("cabins").delete().eq("id", data[0].id);

    throw new Error("Cabin image upload failed. Cabin creation aborted.");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  console.log("DELETE cabin id =>", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted .");
  }
  return data;
}
