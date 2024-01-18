import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { SongController } from './song.controller';
import { SongValidation } from './song.validation';

const route = express.Router();

route.post(
  '/add-song',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(SongValidation.addSong),
  SongController.addSong,
);

route.get('/get-songs', auth(ENUM_USER_ROLE.USER), SongController.getSongs);
route.get(
  '/get-song/:id',
  auth(ENUM_USER_ROLE.USER),
  SongController.getSingleSong,
);

export const SongRoutes = route;
