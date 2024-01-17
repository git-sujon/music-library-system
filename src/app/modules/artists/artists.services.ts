import prisma from '../../../shared/prisma';
import { IArtists } from './artists.interface';
import { UserHelpers } from '../../../helpers/userHelpers';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const addArtist = async (token: string | undefined, payload: IArtists) => {
  const decodedUserInfo = await UserHelpers.verifyDecodedUser(token);

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

const getArtists = async () => {
  const result = await prisma.artist.findMany();
  return result;
};

const getSingleArtist = async (id: string) => {
  const result = await prisma.artist.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artist not found');
  }
  return result;
};

const updateArtist = async (
  token: string | undefined,
  id: string,
  payload: IArtists,
) => {
  const decodedUserInfo = await UserHelpers.verifyDecodedUser(token);
  const { name, albums } = payload;
  const result = await prisma.artist.update({
    where: {
      id,
      userId: decodedUserInfo.id,
    },
    data: {
      name,

      albums: {
        connect: albums.map(artist => ({ id: artist })),
      },
    },
    include: {
      albums: true,
    },
  });
  return result;
};

const deleteArtist = async (token: string | undefined, id: string) => {
  const decodedUserInfo = await UserHelpers.verifyDecodedUser(token);

  const result = await prisma.artist.deleteMany({
    where: {
      id,
      userId: decodedUserInfo.id,
    },
  });

  if (result.count === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artist not found');
  }

  return true;
};

export const ArtistServices = {
  addArtist,
  getArtists,
  getSingleArtist,
  updateArtist,
  deleteArtist,
};
