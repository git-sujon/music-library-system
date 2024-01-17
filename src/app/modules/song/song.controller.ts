import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { SongServices } from './song.services';
import pick from '../../../shared/pick';
import { songFilterAbleFields } from './song.contents';
import { paginationFields } from '../../../constants/pagination';

const addSong = catchAsync(async (req: Request, res: Response) => {
  const authToken = req.headers.authorization;
  const payload = req.body;
  const result = await SongServices.addSong(authToken, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Song add successfully!',
    data: result,
  });
});
const getSongs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, songFilterAbleFields);

  const options = pick(req.query, paginationFields);

  const result = await SongServices.getSongs(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieves Songs successfully!',
    data: result,
  });
});

const getSingleSong = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SongServices.getSingleSong(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieves Song successfully!',
    data: result,
  });
});

export const SongController = {
  addSong,
  getSongs,
  getSingleSong,
};
