import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUserLogin, IUserSignUp } from './auth.interface';
import { UserRole } from '@prisma/client';

const userSignUp = async (payload: IUserSignUp) => {
  const userEmailAlreadyExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (userEmailAlreadyExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email Already Exist');
  }

  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bycrypt_salt_rounds),
  );

  payload.password = hashPassword;

  const user = await prisma.user.create({
    data: {
      role:UserRole.user,
      ...payload,
    },
  });

  const userId = user.id;
  const role = user.role;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as string,
    config.jwt.expires_in as string,
  );

  return accessToken;
};

const loginUser = async (payload: IUserLogin) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email or Password Not Matching');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isUserExist.password,
  );

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email or Password Not Matching',
    );
  }

  const userId = isUserExist.id;
  const role = isUserExist.role;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as string,
    config.jwt.expires_in as string,
  );

  return accessToken;
};

export const AuthServices = {
  userSignUp,
  loginUser,
};
