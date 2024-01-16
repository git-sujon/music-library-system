import { z } from 'zod';

const addArtist = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    albums: z.array(z.string({
      required_error: 'AlbumId is required',
    })),
  }),
});

export const ArtistValidation = {
  addArtist
};
