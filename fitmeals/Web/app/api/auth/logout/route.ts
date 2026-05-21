import { isLoggedIn } from "@/src/middleware/isLogged";
import { NextRequest, NextResponse } from "next/server";

export const POST = isLoggedIn(async (req: NextRequest) => {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("UserToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  if (!response) {
    return NextResponse.json(
      {
        message: "An error occured",
      },
      { status: 500 },
    );
  }
  return response;
});
