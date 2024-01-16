import { z } from 'zod';

const addAlbum = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    releaseYear: z.number({
      required_error: 'Release Year is required',
    }),
    genre: z.string({
      required_error: 'genre is required',
    })
  }),
});

export const AlbumValidation = {
    addAlbum
}