import { verifyLoginDetails } from "@/src/validators/auth/LoginDetails.validator";
import { changelockData, getUserByEmail } from "@/src/models/user/UserModel";
import bcrypt from "bcryptjs";
import { createToken } from "@/src/utils/GenerateToken";

export const loginController = async (body: unknown) => {
  const parsed = verifyLoginDetails.parse(body);
  let lockUntilNew = null;
  const user = await getUserByEmail(parsed.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }
  if (user.lockUntil && user.lockUntil > new Date()) {
    throw new Error("Account locked. Try again after 2 hours");
  }

  if (user?.role !== parsed.role) {
    throw new Error("User not found");
  }
  if (user.status === "DELETED") {
    throw new Error(
      "Account has been deleted to recover contact support team at fitmeals.auth@gmail.com",
    );
  }
  const isMatch = await bcrypt.compare(parsed.password, user.password);
  if (isMatch) {
    await changelockData(user.id, { updatefailedAttempts: 0 });
  } else {
    const newAttempts = user.failedAttempts + 1;

    if (newAttempts >= 5) {
      await changelockData(user.id, {
        updatefailedAttempts: newAttempts,
        lockUntil: new Date(Date.now() + 2 * 60 * 60 * 1000),
      });
      throw new Error("Too many attempts. Account locked for 2 hours");
    } else {
      await changelockData(user.id, {
        updatefailedAttempts: newAttempts,
      });
      throw new Error("Invalid email or password");
    }
  }

  const token = createToken({
    id: user.id,
    role: user.role,
    email: user.email,
    username: user.name,
    subscriptionType: user.subscriptionsType,
    status: user.status,
    profileUrl: user.profileUrl,
    isVerified: user.isVerified,
    phoneNumber: user.phoneNumber || "",
  });

  return {
    token,
    id: user.id,
    email: user.email,
    role: user.role,
    username: user.name,
    subscriptionType: user.subscriptionsType,
  };
};
