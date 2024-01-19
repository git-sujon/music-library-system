"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const song_controller_1 = require("./song.controller");
const song_validation_1 = require("./song.validation");
const route = express_1.default.Router();
route.post('/add-song', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(song_validation_1.SongValidation.addSong), song_controller_1.SongController.addSong);
route.get('/get-songs', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), song_controller_1.SongController.getSongs);
route.get('/get-song/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), song_controller_1.SongController.getSingleSong);
exports.SongRoutes = route;
