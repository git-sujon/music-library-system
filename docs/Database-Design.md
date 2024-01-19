# Database Design

The Music Library System uses a PostgreSQL database to store user information, albums, artists, and songs. Here's the schema:

## User Table

The `User` table stores information about users in the system.

```sql
CREATE TABLE "User" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "role" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);


```

## Album Table

The `Album` table stores information about music albums.

```sql
CREATE TABLE "Album" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "title" VARCHAR(255) NOT NULL,
  "releaseYear" INT NOT NULL,
  "genre" VARCHAR(255) NOT NULL,
  "userId" UUID NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);


```
## Artist Table

The `Artist` table stores information about music artists.

```sql

CREATE TABLE "Artist" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "userId" UUID NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);


```
## Song Table

The `Song` table stores information about individual songs.

```sql

CREATE TABLE "Song" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "title" VARCHAR(255) NOT NULL,
  "duration" INT NOT NULL,
  "albumId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("albumId") REFERENCES "Album"("id"),
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);


```