Movies sample API

Locally run application:

`docker-compose up`


Test API

`curl --request POST \
  --url https://movies-awesome-api.herokuapp.com/api/movies \
  --header 'content-type: application/json' \
  --data '{
	"title": "YOUR_MOVIE_TITLE",
	"year": "MOVIE_REALSE_YEAR"
}'`