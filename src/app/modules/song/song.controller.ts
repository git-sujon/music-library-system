import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { SongServices } from './song.services';


const addSong = catchAsync(async (req: Request, res: Response) => {
    const authToken = req.headers.authorization;
    const payload = req.body
  const result = await SongServices.addSong(authToken, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Song add successfully!',
    data: result,
  });
});

export const SongController = {
addSong
};
