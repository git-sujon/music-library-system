"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumRoutes = void 0;
const express_1 = __importDefault(require("express"));
const album_controller_1 = require("./album.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const album_validation_1 = require("./album.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const route = express_1.default.Router();
route.post('/add-album', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(album_validation_1.AlbumValidation.addAlbum), album_controller_1.AlbumController.addAlbum);
route.get('/get-albums', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), album_controller_1.AlbumController.getAlbums);
route.get('/get-album/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), album_controller_1.AlbumController.getSingleAlbum);
route.patch('/update-album/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), album_controller_1.AlbumController.updateAlbum);
route.delete('/delete-album/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), album_controller_1.AlbumController.deleteAlbum);
exports.AlbumRoutes = route;
