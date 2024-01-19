"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const route = express_1.default.Router();
route.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.userLogin), auth_controller_1.AuthController.loginUser);
route.post('/signup', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.userLogin), auth_controller_1.AuthController.userSignUp);
exports.AuthRoutes = route;
