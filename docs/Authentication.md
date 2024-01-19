# Authentication

The Music Library System API uses token-based authentication (JWT) to secure endpoints. Users can register and log in using the following endpoints.

## User Registration (POST /auth/signup)

To create a new user account, send a POST request to the following endpoint:

```http
POST {{PRE_URL}}/auth/signup


Request Body:

{
  "name": "Sujon",
  "email": "sujon@gmail.com",
  "password": "@VerySecretPassword1234"
}


User Login (POST /auth/login)
To log in as an existing user, send a POST request to the following endpoint:

POST {{PRE_URL}}/auth/login

{
  "email": "sujon@gmail.com",
  "password": "1234"
}
