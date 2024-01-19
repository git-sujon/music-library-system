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
exports.ArtistServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const userHelpers_1 = require("../../../helpers/userHelpers");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const addArtist = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUserInfo = yield userHelpers_1.UserHelpers.verifyDecodedUser(token);
    const { name, albums } = payload;
    const result = yield prisma_1.default.artist.create({
        data: {
            userId: decodedUserInfo.id,
            name: name,
            albums: {
                connect: albums.map(album => ({ id: album })),
            },
        },
        include: {
            albums: true,
        },
    });
    return result;
});
const getArtists = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.artist.findMany({
        include: {
            albums: true,
        },
    });
    return result;
});
const getSingleArtist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.artist.findUnique({
        where: {
            id,
        },
        include: {
            albums: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Artist not found');
    }
    return result;
});
const updateArtist = (token, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUserInfo = yield userHelpers_1.UserHelpers.verifyDecodedUser(token);
    const { name, albums } = payload;
    const result = yield prisma_1.default.artist.update({
        where: {
            id,
            userId: decodedUserInfo.id,
        },
        data: {
            name,
            albums: {
                set: albums === null || albums === void 0 ? void 0 : albums.map(album => ({ id: album })),
            },
        },
        include: {
            albums: true,
        },
    });
    return result;
});
const deleteArtist = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUserInfo = yield userHelpers_1.UserHelpers.verifyDecodedUser(token);
    const result = yield prisma_1.default.artist.deleteMany({
        where: {
            id,
            userId: decodedUserInfo.id,
        },
    });
    if (result.count === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Artist not found');
    }
    return true;
});
exports.ArtistServices = {
    addArtist,
    getArtists,
    getSingleArtist,
    updateArtist,
    deleteArtist,
};
