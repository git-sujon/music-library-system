"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const artists_validation_1 = require("./artists.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const artists_controller_1 = require("./artists.controller");
const route = express_1.default.Router();
route.post('/add-artist', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(artists_validation_1.ArtistValidation.addArtist), artists_controller_1.ArtistController.addArtist);
route.get('/get-artists', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), artists_controller_1.ArtistController.getArtists);
route.get('/get-artist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), artists_controller_1.ArtistController.getSingleArtist);
route.patch('/update-artist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), artists_controller_1.ArtistController.updateArtist);
route.delete('/delete-artist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), artists_controller_1.ArtistController.deleteArtist);
exports.ArtistRoutes = route;
