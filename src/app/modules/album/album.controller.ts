import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { AlbumServices } from './album.services';



const addAlbum = catchAsync(async (req: Request, res: Response) => {
    const authToken = req.headers.authorization;
    const payload = req.body
    const result = await AlbumServices.addAlbum(authToken,payload)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Album created successfully',
      data: result,
    });
  });


  export const AlbumController = {
    addAlbum
  }