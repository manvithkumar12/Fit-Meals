export type queryInput = {
  message:string,
  email:string,
  firstName:string,
  lastName:string
}

export type queryDB = queryInput & {
    status : "OPEN" | "CLOSED",
    userId:number
}