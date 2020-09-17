# Movies API

### Local development
1. Create .env file in root directory with following variables
```
PORT=4040
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=movies-db
RESOURCE_BASE_URL=http://omdbapi.com?apikey=fcf6b54f
```

2. Install all dependencies
`npm i`

3. Run image from compose
`docker-compose up`

## Swagger documentation
https://movies-awesome-api.herokuapp.com/api

## Features overview

### POST /movies
Based on passed data `title` and `year` - searches http://www.omdbapi.com/ and save found movie in Database

### GET /movie
Returns all movies saved in Database

### POST /comments
Based on passed `movieTitle` - search for movie in Database and assign comment to found movie

### GET /comments
Returns all comments with assigned movies

### Movies API is using http://www.omdbapi.com/ with my private free api key
### Movies API is deployed on Heroku

