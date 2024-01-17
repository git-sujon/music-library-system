import { z } from 'zod';

const addSong = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    duration: z.number({
      required_error: 'duration is required',
    }),
    
    albumId: z.string({
      required_error: 'albumId is required',
    }),
    
  }),
});

export const SongValidation = {
  addSong
};
