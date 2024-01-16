/*
  Warnings:

  - You are about to drop the `ArtistAndAlbum` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtistAndAlbum" DROP CONSTRAINT "ArtistAndAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistAndAlbum" DROP CONSTRAINT "ArtistAndAlbum_artistId_fkey";

-- DropTable
DROP TABLE "ArtistAndAlbum";
