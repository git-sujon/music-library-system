# Albums

Users can perform various operations related to albums, including adding, updating, and deleting albums. All album-related endpoints require authentication.

## Add Album (POST /albums/add-album)

To add a new album, send a POST request to the following endpoint:

```http
POST {{PRE_URL}}/albums/add-album


Request Body:
{
  "title": "Off the Wall",
  "releaseYear": 1979,
  "genre": "Pop music",
  "artists": ["1e60169b-784b-4f15-ace0-43dc7f2c801a"]
}

Get Albums (GET /albums/get-albums)
To retrieve a list of all albums, send a GET request to the following endpoint:

GET {{PRE_URL}}/albums/get-albums


Get Single Album (GET /albums/get-album/{albumId})
To retrieve information about a specific album, send a GET request to the following endpoint:

GET {{PRE_URL}}/albums/get-albums


Get Single Album (GET /albums/get-album/{albumId})
To retrieve information about a specific album, send a GET request to the following endpoint:

GET {{PRE_URL}}/albums/get-album/beada6bb-ebbe-4aea-bf65-71194a5af984


Update Album (PATCH /albums/update-album/{albumId})
To update information about a specific album, send a PATCH request to the following endpoint:

PATCH {{PRE_URL}}/albums/update-album/0b710b86-6fbf-4701-85fb-c72b3ff7900b

Request Body:

{
  "title": "Dangerous",
  "releaseYear": 1991,
  "genre": "Pop music",
  "artists": ["441ef8d0-472a-4987-ac30-5d651325adcd"]
}

Delete Album (DELETE /albums/delete-album/{albumId})
To delete a specific album, send a DELETE request to the following endpoint:
DELETE {{PRE_URL}}/albums/delete-album/00df45a0-e6ee-4508-aad9-9d78d5d2baf5
