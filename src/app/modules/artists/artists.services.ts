import prisma from '../../../shared/prisma';
import { IArtists } from './artists.interface';
import { UserHelpers } from '../../../helpers/userHelpers';

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

export const ArtistServices = {
  addArtist,
};
