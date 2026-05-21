import { cookBookInput } from "@/src/types/modelTypes/supportTeam/cookbook.types";

export const postCookbookItem = async(data : cookBookInput)=>{
    const res = await fetch ("/api/supportTeam/cookBook",{
        credentials:"include",
        headers : {"content-type":"application/json"},
        method:"POST",
        body : JSON.stringify(data)
    })
    if(!res.ok){
        const errorMessage = await res.json().catch(()=>null)
        throw new Error(errorMessage?.message || "unable to add data");
        
    }
}