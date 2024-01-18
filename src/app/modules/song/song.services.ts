import prisma from '../../../shared/prisma';
import { ISong, ISongFilterAbleFields } from './song.interface';
import { UserHelpers } from '../../../helpers/userHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { songSearchableFields } from './song.contents';

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

const getSongs = async (
  filters: ISongFilterAbleFields,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, artistId, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: songSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (artistId) {
    andConditions.push({
      album: {
        artists: {
          some: {
            id: artistId,
          },
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as never)[key],
        },
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.song.findMany({
    where: {
      ...whereConditions,
    },
    include: {
      album: {
        include: {
          artists: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
 
  const total = result.length;
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getSingleSong = async (id: string) => {
  const result = await prisma.song.findUnique({
    where: {
      id,
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
  getSongs,
  getSingleSong,
};
