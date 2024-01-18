import { IAlbum } from './album.interface';
import prisma from '../../../shared/prisma';
import { UserHelpers } from '../../../helpers/userHelpers';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const addAlbum = async (token: string | undefined, payload: IAlbum) => {
  const decodedUserInfo = await UserHelpers.verifyDecodedUser(token);

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

const getAlbums = async () => {
  const result = await prisma.album.findMany({
    include: {
      artists: true,
    },
  });
  return result;
};

const getSingleAlbum = async (id: string) => {
  const result = await prisma.album.findUnique({
    where: {
      id,
    },
    include: {
      artists: true,
    },
  });
  return result;
};

const updateAlbum = async (
  token: string | undefined,
  id: string,
  payload: IAlbum,
) => {
  const decodedUserInfo = await UserHelpers.verifyDecodedUser(token);
  const { title, genre, releaseYear, artists } = payload;
  const result = await prisma.album.update({
    where: {
      id,
      userId: decodedUserInfo.id,
    },
    data: {
      title,
      genre,
      releaseYear,
      artists: {
        set: artists?.map(artist => ({ id: artist })),
      },
    },
    include: {
      artists: true,
    },
  });
  return result;
};

const deleteAlbum = async (token: string | undefined, id: string) => {
  const decodedUserInfo = await UserHelpers.verifyDecodedUser(token);

  const result = await prisma.$transaction(async tx => {
    await tx.song.deleteMany({
      where: {
        albumId: id,
      },
    });

    const album = await tx.album.deleteMany({
      where: {
        id,
        userId: decodedUserInfo.id,
      },
    });

    if (album.count === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Artist not found');
    }
  });
  return result;
};

export const AlbumServices = {
  addAlbum,
  getAlbums,
  getSingleAlbum,
  updateAlbum,
  deleteAlbum,
};
