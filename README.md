# Music Library System

This project involves building a Music Library System with user authentication, album and artist management, song addition, and a relational database backend. The system will be developed using Express.js, TypeScript, and either MySQL or PostgreSQL.

## Features

### User Authentication
- Users can register and log in securely.
- Passwords are hashed for security.
- Authentication is token-based using JSON Web Tokens (JWT).
- Access to all APIs is protected with the access token.

### Music Albums and Artists
- Users can add music albums to the library.
- Each album has a title, release year, and genre.
- Many-to-many relationship design between albums and artists.
- Only authenticated users can add albums and artists.

### Songs
- Users can add individual songs to the library.
- Each song has a title, duration, and is associated with an album.
- Only authenticated users can add songs.

### Database Design
- Relational database schema to store user information, albums, artists, and songs.
- Choice between MySQL or PostgreSQL.
- SQL scripts provided for creating necessary tables, including many-to-many relationships.

### REST API
- RESTful API implemented using Express.js and TypeScript.
- Interaction with the database using raw SQL queries or Knex query builder.
- Endpoints for user registration, login, album, and artist CRUD operations, adding songs, and retrieving songs by album or artist.
- Validation using Joi or Express Validator.

## Getting Started

1. **Clone the repository.**

    ```bash
    git clone https://github.com/your-username/music-library-system.git
    ```

2. **Install dependencies.**

    ```bash
    cd music-library-system
    npm install
    ```

3. **Set up the database schema.**

   - Choose either MySQL or PostgreSQL.
   - Run the provided SQL scripts to create tables.

      ```bash
      # For MySQL
      npm run db:setup:mysql

      # For PostgreSQL
      npm run db:setup:postgres
      ```

4. **Configure environment variables.**

   - Create a `.env` file based on `.env.example` and provide necessary details.

5. **Run the application.**

    ```bash
    npm run dev
    ```

   The server will start, and you can access the API at `http://localhost:5000`.

## API Documentation

Detailed API documentation can be found in the `docs` folder.

### Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/collections/24279792-45f35380-aabb-4a8f-9e4c-ef1f7a38047d)

