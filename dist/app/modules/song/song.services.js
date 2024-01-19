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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const userHelpers_1 = require("../../../helpers/userHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const song_contents_1 = require("./song.contents");
const addSong = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUserInfo = yield userHelpers_1.UserHelpers.verifyDecodedUser(token);
    const { title, duration, albumId } = payload;
    const result = yield prisma_1.default.song.create({
        data: {
            userId: decodedUserInfo.id,
            title,
            duration,
            albumId,
        },
        include: {
            album: {
                include: {
                    artists: true,
                },
            },
        },
    });
    return result;
});
const getSongs = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, artistId } = filters, filterData = __rest(filters, ["searchTerm", "artistId"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: song_contents_1.songSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (artistId) {
        andConditions.push({
            album: {
                artists: {
                    some: {
                        id: artistId,
                    },
                },
            },
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.song.findMany({
        where: Object.assign({}, whereConditions),
        include: {
            album: {
                include: {
                    artists: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = result.length;
    return {
        meta: {
            page: page,
            limit: limit,
            total: total,
        },
        data: result,
    };
});
const getSingleSong = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.findUnique({
        where: {
            id,
        },
        include: {
            album: {
                include: {
                    artists: true,
                },
            },
        },
    });
    return result;
});
exports.SongServices = {
    addSong,
    getSongs,
    getSingleSong,
};
