
---

### Songs.md

```markdown
# Songs

Users can add individual songs to the library, associating them with specific albums. Here are the endpoints for song-related operations.

## Add Song (POST /songs/add-song)

To add a new song, send a POST request to the following endpoint:

```http
POST {{PRE_URL}}/songs/add-song

Request Body:

{
  "title": "Remember the Time",
  "duration": 240,
  "albumId": "0b710b86-6fbf-4701-85fb-c72b3ff7900b"
}

Get Songs (GET /songs/get-songs)
To retrieve a list of all songs, send a GET request to the following endpoint:
GET {{PRE_URL}}/songs/get-songs

Get Single Song (GET /songs/get-song/{songId})
To retrieve information about a specific song, send a GET request to the following endpoint:

GET {{PRE_URL}}/songs/get-song/9721f545-1d6c-4e41-9163-c68af52e2cfd
