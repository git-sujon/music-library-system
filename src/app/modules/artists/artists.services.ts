import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IArtists } from './artists.interface';

const addArtist = async (token: string | undefined, payload: IArtists) => {
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Unauthorized access');
  }

  const { name, albums } = payload;

  const result = await prisma.artist.create({
    data: {
      userId: decodedUserInfo.id,
      name: name,
      albums: {
        connect: albums.map(album => ({ id: album })),
      },
    },
    include: {
      albums: true,
    },
  });

  return result;
};

export const ArtistServices = {
  addArtist,
};
