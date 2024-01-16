import { IAlbum } from './album.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const addAlbum = async (token: string | undefined, payload: IAlbum) => {
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }
  const verifyToken = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as Secret,
  );
  const decodedUserInfo = await prisma.user.findUnique({
    where: {
      id: verifyToken?.userId,
    },
  });

  if (!decodedUserInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Exist');
  }

  const { title, genre, releaseYear, artists } = payload;

  const result = await prisma.album.create({
    data: {
      userId: decodedUserInfo.id,
      title,
      genre,
      releaseYear,
      artists: {
        connect: artists.map(artist => ({ id: artist })),
      },
    },
    include: {
      artists: true,
    },
  });

  return result;
};

export const AlbumServices = {
  addAlbum,
};
