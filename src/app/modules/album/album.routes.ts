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

route.get('/get-albums', auth(ENUM_USER_ROLE.USER), AlbumController.getAlbums);
route.get(
  '/get-album/:id',
  auth(ENUM_USER_ROLE.USER),
  AlbumController.getSingleAlbum,
);
route.patch(
  '/update-album/:id',
  auth(ENUM_USER_ROLE.USER),
  AlbumController.updateAlbum,
);
route.delete(
  '/delete-album/:id',
  auth(ENUM_USER_ROLE.USER),
  AlbumController.deleteAlbum,
);

export const AlbumRoutes = route;
