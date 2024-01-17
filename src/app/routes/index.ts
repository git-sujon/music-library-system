import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AlbumRoutes } from '../modules/album/album.routes';
import { ArtistRoutes } from '../modules/artists/artists.routes';
import { SongRoutes } from '../modules/song/song.routes';
const router = express.Router();

const moduleRoutes = [
  
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/albums',
    route: AlbumRoutes,
  },
  {
    path: '/artists',
    route: ArtistRoutes,
  },
  {
    path: '/songs',
    route: SongRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
