"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const userHelpers_1 = require("../../../helpers/userHelpers");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const addAlbum = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUserInfo = yield userHelpers_1.UserHelpers.verifyDecodedUser(token);
    const { title, genre, releaseYear, artists } = payload;
    const result = yield prisma_1.default.album.create({
        data: {
            userId: decodedUserInfo.id,
            title,
            genre,
            releaseYear,
            artists: {
                connect: artists.map(artist => ({ id: artist })),
            },
        },
        include: {
            artists: true,
        },
    });
    return result;
});
const getAlbums = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.album.findMany({
        include: {
            artists: true,
        },
    });
    return result;
});
const getSingleAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.album.findUnique({
        where: {
            id,
        },
        include: {
            artists: true,
        },
    });
    return result;
});
const updateAlbum = (token, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUserInfo = yield userHelpers_1.UserHelpers.verifyDecodedUser(token);
    const { title, genre, releaseYear, artists } = payload;
    const result = yield prisma_1.default.album.update({
        where: {
            id,
            userId: decodedUserInfo.id,
        },
        data: {
            title,
            genre,
            releaseYear,
            artists: {
                set: artists === null || artists === void 0 ? void 0 : artists.map(artist => ({ id: artist })),
            },
        },
        include: {
            artists: true,
        },
    });
    return result;
});
const deleteAlbum = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUserInfo = yield userHelpers_1.UserHelpers.verifyDecodedUser(token);
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.song.deleteMany({
            where: {
                albumId: id,
            },
        });
        const album = yield tx.album.deleteMany({
            where: {
                id,
                userId: decodedUserInfo.id,
            },
        });
        if (album.count === 0) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Artist not found');
        }
    }));
    return result;
});
exports.AlbumServices = {
    addAlbum,
    getAlbums,
    getSingleAlbum,
    updateAlbum,
    deleteAlbum,
};
