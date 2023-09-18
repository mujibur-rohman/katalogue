import { db } from "../app/database";
import { ResponseError } from "../error/response-error";
import { signJWT } from "../utils/jwt";
import { validate } from "../validation";
import {
  loginValidation,
  refreshValidation,
  registerValidation,
} from "../validation/auth.validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request: any) => {
  const user = validate(registerValidation, request);

  if (user.provider === "google") {
    throw new ResponseError(400, "provider must credential provider");
  }

  if (user.provider === "credential" && !user.password) {
    throw new ResponseError(400, "password is required");
  }

  /* 
    Check if user exist
  */

  const userExist = await db.user.count({
    where: {
      email: user.email,
    },
  });

  if (userExist > 0) {
    throw new ResponseError(400, "user already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return db.user.create({
    data: {
      ...user,
      id: uuid(),
    },
    select: {
      id: true,
      email: true,
      name: true,
      provider: true,
    },
  });
};

const login = async (request: any) => {
  const userValid = validate(loginValidation, request);

  const user = await db.user.findUnique({
    where: {
      email: userValid.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      profile: true,
    },
  });

  if (!user) {
    throw new ResponseError(403, "email not registered");
  }

  if (!user.password) {
    throw new ResponseError(403, "account as google provider");
  }

  const isPasswordValid = await bcrypt.compare(
    userValid.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(403, "password wrong");
  }

  const accessToken = signJWT(
    {
      email: user.email,
      id: user.id,
    },
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = signJWT(
    {
      email: user.email,
      id: user.id,
    },
    {
      expiresIn: "1d",
    }
  );

  await db.user.update({
    data: {
      token: refreshToken,
    },
    where: {
      email: user.email,
    },
    select: {
      email: true,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profilePicture: user.profile?.profilePicture || null,
    token: {
      accessToken,
      refreshToken,
    },
  };
};

const refreshToken = async (request: any) => {
  const token = validate(refreshValidation, request);
  const refreshToken = await db.user.findFirst({
    where: {
      token: token.token,
    },
    select: {
      token: true,
      email: true,
      id: true,
    },
  });

  if (!refreshToken) throw new ResponseError(404, "token invalid");

  const newAccessToken = signJWT(
    {
      email: refreshToken.email,
      id: refreshToken.id,
    },
    {
      expiresIn: "1h",
    }
  );
  const newRefreshToken = signJWT(
    {
      email: refreshToken.email,
      id: refreshToken.id,
    },
    {
      expiresIn: "1d",
    }
  );

  await db.user.update({
    data: {
      token: newRefreshToken,
    },
    where: {
      email: refreshToken.email,
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export default {
  register,
  login,
  refreshToken,
};
