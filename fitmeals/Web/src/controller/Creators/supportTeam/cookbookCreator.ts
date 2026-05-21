import { cookBookModel } from "@/src/models/supportTeam/cookBookModel";
import { cookBookValidator } from "@/src/validators/supportTeam/cookBook.validator"

export const createCookbook = async(body:unknown,addedBy:number)=>{
    const parsed = cookBookValidator.parse(body);
    return await cookBookModel({...parsed,addedBy})
}