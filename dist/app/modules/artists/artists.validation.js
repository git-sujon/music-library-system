"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistValidation = void 0;
const zod_1 = require("zod");
const addArtist = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        albums: zod_1.z.array(zod_1.z.string({
            required_error: 'AlbumId is required',
        })),
    }),
});
exports.ArtistValidation = {
    addArtist
};
