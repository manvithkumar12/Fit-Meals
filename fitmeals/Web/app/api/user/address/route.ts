import { createAddress } from "@/src/controller/Creators/user/adressCreate";
import { isLoggedIn } from "@/src/middleware/isLogged";
import { findAddressLimitAvailable } from "@/src/models/user/addressModel";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = isLoggedIn(async (req: NextRequest, user) => {
  try {
    const body = await req.json();
    if (!body.id) {
      const isApproved = await findAddressLimitAvailable(user.id);

      if (!isApproved) {
        return NextResponse.json(
          {
            message: "Cannot add more than 3 addresses",
            state: "Failed",
          },
          { status: 403 },
        );
      }
    }

    const isDefault = true;

    await createAddress(body, user.id, isDefault, body.id);

    return NextResponse.json(
      {
        message: body.id
          ? "Address updated successfully"
          : "New address added successfully",

        state: "Success",
      },
      { status: body.id ? 200 : 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues[0]?.message || "Validation error",
          state: "Warning",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "An error occurred, try again later",
        state: "Failed",
      },
      { status: 500 },
    );
  }
});
