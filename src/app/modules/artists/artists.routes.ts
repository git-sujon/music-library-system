import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ArtistValidation } from './artists.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ArtistController } from './artists.controller';

const route = express.Router();

route.post(
  '/add-artist',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ArtistValidation.addArtist),
  ArtistController.addArtist,
);

export const ArtistRoutes = route;
