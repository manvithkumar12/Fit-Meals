"use client"
import Image from "next/image"
import Link from "@/src/Components/LocalizedLink"

interface Roleinfo{
    imageid:string,
    btnTxt:string,
    navigation?:string
    type?:"Register" | "Login"
}

const RoleCards = ({imageid,btnTxt,navigation,type}:Roleinfo) => {
  return (
    <Link href={`/${type?.toLowerCase()}/${navigation}`}>
      <div className="h-50 w-50 shadow-lg bg-white rounded-lg flex flex-col justify-center items-center p-4">
        <div className="h-30 w-30 relative">
        <Image fill className="object-cover" loading="lazy" placeholder="blur" blurDataURL="/blur.jpeg" src={imageid} alt="shopkeeper"/>
        </div>
        <h4 className="text-black font-semibold text-center">{btnTxt}</h4>
      </div>
    </Link>
  )
}

export default RoleCards
