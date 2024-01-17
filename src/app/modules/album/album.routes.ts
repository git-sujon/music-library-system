import express from 'express';
import { AlbumController } from './album.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AlbumValidation } from './album.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const route = express.Router();

route.post(
  '/add-album',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(AlbumValidation.addAlbum),
  AlbumController.addAlbum,
);

route.get('/get-albums', AlbumController.getAlbums);
route.get('/get-album/:id', AlbumController.getSingleAlbum);

export const AlbumRoutes = route;
