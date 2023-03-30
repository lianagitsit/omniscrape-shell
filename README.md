# omniscrape-shell

Scrape one tarot deck from one web site. Lol.

## Docker stuff

Kill the whale: (some of these seem redundant but it does the trick?)
`docker-compose stop && docker-compose rm && docker-compose down -v && docker volume prune && docker image prune`

`docker compose stop` stop services
`docker compose rm` remove stopped service containers
`docker compose down -v` stop and remove containers, networks, named volumes
`docker volume prune` remove all volumes not used by a container
`docker image prune` remove all images not associated with a container

`docker-compose up -d` bring up all containers in docker compose in detached mode
`docker compose ps` show all containers' status
`docker-compose restart [service name]` rebuild one service after making changes
