"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongValidation = void 0;
const zod_1 = require("zod");
const addSong = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        duration: zod_1.z.number({
            required_error: 'duration is required',
        }),
        albumId: zod_1.z.string({
            required_error: 'albumId is required',
        }),
    }),
});
exports.SongValidation = {
    addSong
};
