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


  const getArtists = catchAsync(async (req: Request, res: Response) => {
    const result = await ArtistServices.getArtists();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrieved Artists successfully',
      data: result,
    });
  });
  
  const getSingleArtist = catchAsync(async (req: Request, res: Response) => {
  
    const { id } = req.params;
    const result = await ArtistServices.getSingleArtist( id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrieved Artist successfully',
      data: result,
    });
  });
  
  
  const updateArtist = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authToken = req.headers.authorization;
    const payload = req.body;
    const result = await ArtistServices.updateArtist(authToken, id, payload);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Artist successfully',
      data: result,
    });
  });
  
  const deleteArtist = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authToken = req.headers.authorization;
    const result = await ArtistServices.deleteArtist(authToken, id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Artist successfully',
      data: result,
    });
  });

  export const ArtistController = {
    addArtist,
    getArtists,
    getSingleArtist,
    updateArtist,
    deleteArtist
  }