import { IAlbum } from './album.interface';
import prisma from '../../../shared/prisma';
import { UserHelpers } from '../../../helpers/userHelpers';

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

export const AlbumServices = {
  addAlbum,
};
