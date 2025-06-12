docker compose --build 
docker compose run --rm api yarn install
docker compose run --rm front yarn install
docker compose up