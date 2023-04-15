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

`docker build -t omniscrape-api:latest -f Dockerfile.prod .` build image using a specific dockerfile (-f is file path)

`docker tag omniscrape-api registry.digitalocean.com/lgm-registry/omniscrape-api` tag image with fully qualified destination path to container registry

`docker push registry.digitalocean.com/lgm-registry/omniscrape-api` uploads image

`doctl auth init --context <NAME>`
`doctl auth list`
`doctl auth switch --context <NAME>`

## Resources

[How to Use the Official Nginx Docker Image](https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/)
[Introduction to Prisma with Docker](https://www.section.io/engineering-education/dockerized-prisma-postgres-api/)
[node-react-docker-compose example repo](https://github.com/mrcoles/node-react-docker-compose)
[Create a Postgres Database Using Docker-compose](https://herewecode.io/blog/create-a-postgresql-database-using-docker-compose/)


## Deploying

To build and push a Dockerfile to DigitalOcean with GH Actions:

[X] can you get back into your server on digital ocean
[X] install docker on digital ocean server (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04)
[X] create a container registry in digital ocean: https://docs.digitalocean.com/products/container-registry/quickstart/
[X] setup digital ocean credentials as secrets (see https://medium.com/swlh/how-to-deploy-your-application-to-digital-ocean-using-github-actions-and-save-up-on-ci-cd-costs-74b7315facc2)
[ ] create a new github actions workflow named "Build and Push Docker Image"
[X] prepare production api server dockerfile?
[ ] manually push the image to container registry
[ ] on commit, github action workflow: pull the image from the container registry and use it to create containers in production environment
[ ] modify nginx conf on DO server? 


## Access digital ocean server
`ssh <username>@<droplet IP>`

`docker pull registry.digitalocean.com/lgm-registry/omniscrape-api:latest` pull the image from the container reg
`docker build -t omniscrape-api:latest .`

Create a container from your server image and run it on a port that is accessible from the nginx server. For example, you can run the container on port 8080. This is the one you want.
`docker run -p 8080:8080 -d registry.digitalocean.com/lgm-registry/omniscrape-api:latest`

Stop all running containers:
`docker stop $(docker ps -a -q)`
Remove all containers:
`docker rm $(docker ps -a -q)`
Remove all images:
`docker rmi $(docker images -a -q)`