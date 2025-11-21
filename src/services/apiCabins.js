import supabase from "./supabase"



const  getCabins = async()=>{
    let { data,error } = await supabase
  .from('cabins')
  .select('*')

if(error) {

    console.err(error)
    throw new Error("Cabins could not be loaded .")
}

return data
} 

export default getCabins

export async function createCabin(newCabin){
  
const { data, error } = await supabase
  .from('cabins')
  .insert([newCabin])     // { some_column: 'someValue', other_column: 'otherValue' },

  .select()

  if(error) {

    console.error(error)
    throw new Error("Cabins could not be deleted .")
}
return data

}


export async function deleteCabin(id){
  
    const { data , error } = await supabase
      .from('cabins')
      .delete()
      .eq('id', id)

      console.log("DELETE cabin id =>", id);


if(error) {

    console.error(error)
    throw new Error("Cabins could not be deleted .")
}
return data

}