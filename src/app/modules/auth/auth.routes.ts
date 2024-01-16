import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const route = express.Router();

route.post('/login', validateRequest(AuthValidation.userLogin), AuthController.loginUser);
route.post('/signup', validateRequest(AuthValidation.userLogin),  AuthController.userSignUp);

export const AuthRoutes = route;
