import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "@/src/config/s3";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}) as any);

    const allowedFolders = [
      "Restaurants",
      "userProfiles",
      "menuItems",
      "foodItems",
      "reservations",
      "Riders",
      "users",
    ];

    const folder = body?.folder;

    const isValid =
      typeof folder === "string" &&
      allowedFolders.some((f) => folder.startsWith(f));

    if (!isValid) {
      return NextResponse.json(
        {
          message: "No such directory",
          state: "Failed",
        },
        { status: 500 },
      );
    }

    const contentType: string = body?.contentType || "image/png";

    const ext = contentType.split("/")[1] || "png";

    const fileName = `${folder}/${Date.now()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: fileName,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60,
    });

    const fileUrl = `https://drin721riupcf.cloudfront.net/${fileName}`;

    return NextResponse.json({
      uploadUrl,
      fileUrl,
    });
  } catch (error) {
    NextResponse.json(
      {
        message: "an error occured file not uploaded",
        state: "failed",
      },
      { status: 500 },
    );
  }
}
