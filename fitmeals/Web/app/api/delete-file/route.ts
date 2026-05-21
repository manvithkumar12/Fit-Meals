import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/src/config/s3";

export async function DELETE(req: NextRequest) {
  try {
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json(
        { message: "File URL is required" },
        { status: 400 },
      );
    }
    const key = decodeURIComponent(new URL(fileUrl).pathname.slice(1));

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
      }),
    );

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete file",
      },
      { status: 500 },
    );
  }
}
