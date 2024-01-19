"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const album_routes_1 = require("../modules/album/album.routes");
const artists_routes_1 = require("../modules/artists/artists.routes");
const song_routes_1 = require("../modules/song/song.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/albums',
        route: album_routes_1.AlbumRoutes,
    },
    {
        path: '/artists',
        route: artists_routes_1.ArtistRoutes,
    },
    {
        path: '/songs',
        route: song_routes_1.SongRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
