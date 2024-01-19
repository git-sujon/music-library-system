
---

### Artists.md

```markdown
# Artists

Users can perform various operations related to artists, including adding, updating, and deleting artists. The API supports a many-to-many relationship between albums and artists.

## Add Artist (POST /artists/add-artist)

To add a new artist, send a POST request to the following endpoint:

```http
POST {{preAPI}}/artists/add-artist

Request Body:

{
  "name": "Michael Jackson",
  "albums": []
}


Get Artists (GET /artists/get-artists)
To retrieve a list of all artists, send a GET request to the following endpoint:

GET {{PRE_URL}}/artists/get-artists


Get Single Artist (GET /artists/get-artist/{artistId})
To retrieve information about a specific artist, send a GET request to the following endpoint:

GET {{PRE_URL}}/artists/get-artist/9f2e1aea-8b33-4665-8262-9ee702d205aa


Update Artist (PATCH /artists/update-artist/{artistId})
To update information about a specific artist, send a PATCH request to the following endpoint:

PATCH {{PRE_URL}}/artists/update-artist/1e60169b-784b-4f15-ace0-43dc7f2c801a
Request Body:
{
  "name": "Michael Jackson",
  "albums": ["38152296-9ec5-4850-997d-575446519b46"]
}


Delete Artist (DELETE /artists/delete-artist/{artistId})
To delete a specific artist, send a DELETE request to the following endpoint:
DELETE {{PRE_URL}}/artists/delete-artist/b5343a98-6490-436f-b838-74c1b2c584d2
