import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AlbumRoutes } from '../modules/album/album.routes';
import { ArtistRoutes } from '../modules/artists/artists.routes';
const router = express.Router();

const moduleRoutes = [
  
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/album',
    route: AlbumRoutes,
  },
  {
    path: '/artist',
    route: ArtistRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
