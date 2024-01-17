import prisma from '../../../shared/prisma';
import { ISong } from './song.interface';
import { UserHelpers } from '../../../helpers/userHelpers';

const addSong = async (token: string | undefined, payload: ISong) => {
  const decodedUserInfo = await UserHelpers.verifyDecodedUser(token);

  const { title, duration, albumId } = payload;

  const result = await prisma.song.create({
    data: {
      userId: decodedUserInfo.id,
      title,
      duration,
      albumId,
    },
    include: {
      album: {
        include: {
          artists: true,
        },
      },
    },
  });

  return result;
};

export const SongServices = {
  addSong,
};
