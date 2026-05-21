import { getCookbooksById } from "@/app/api/actions/cookbook/getCookbook";
import CookBookItem from "@/src/Components/ServiceComponent/CookBook/CookBook-item";
import { notFound } from "next/navigation";
import React from "react";

const getData = getCookbooksById;

const page = async ({ params }: { params: Promise<{ Item: string }> }) => {
  const { Item } = await params;
  const ItemId = Number(Item.split("-")[1]);
  const Data = await getCookbooksById(ItemId);
  if (!ItemId || !Data) return notFound();
  return (
    <div>
      <CookBookItem Item={Data} />
    </div>
  );
};

export default page;
