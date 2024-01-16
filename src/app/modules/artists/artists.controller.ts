import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import {ArtistServices } from './artists.services';



const addArtist = catchAsync(async (req: Request, res: Response) => {
    const authToken = req.headers.authorization;
    const payload = req.body
    const result = await ArtistServices.addArtist(authToken,payload)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Artist created successfully',
      data: result,
    });
  });


  export const ArtistController = {
    addArtist
  }