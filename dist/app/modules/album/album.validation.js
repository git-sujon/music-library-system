"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumValidation = void 0;
const zod_1 = require("zod");
const addAlbum = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        releaseYear: zod_1.z.number({
            required_error: 'Release Year is required',
        }),
        genre: zod_1.z.string({
            required_error: 'genre is required',
        }),
        artists: zod_1.z.array(zod_1.z.string({
            required_error: 'ArtistId is required',
        })),
    }),
});
exports.AlbumValidation = {
    addAlbum,
};
