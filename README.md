# Transcendence

This project is about creating a website for the mighty Pong contest!

## Initial commads to have it all working (DEVELOPMENT FASE)

- Node

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc
nvm install node
npm install -g npm@latest
```

- Docker

```
docker stop $(docker ps -qa); \
docker rm $(docker ps -qa); \
docker rmi -f $(docker images -qa); \
docker volume rm $(docker volume ls -q); \
docker network rm $(docker network ls -q) \
docker-compose up -d \
```

- Backend

```
cd backend/ && npm install; \
npx prisma migrate reset; \
npx prisma db pull; \
npx prisma generate; \
npm run start:dev
```

- Frontend

```
cd frontend/ && npm install; \
npm run dev
```

## Backend

Command to install backend modules

```
npm install
```

Command to run backend

```
npm run start
OR
npm run start:dev
```

## Frontend

Command to install frontend modules

```
npm install
```

Command to run frontend

```
npm run dev
```

## Database

<h4>Manual Input</h4>

- Access Database

  ```
  docker-compose exec postgres /bin/sh
  psql -d <POSTGRES_DATABASE> -U <POSTGRES_USER> -W
  (when password asked: <POSTGRES_PASSWORD>)

  ```

- List all databases

  ```
  \l
  ```

- Switch to another Database

  ```
  \c <db-name>
  ```

- List database tables

  ```
  \dt
  ```

  <a href="https://hasura.io/blog/top-psql-commands-and-flags-you-need-to-know-postgresql/" target="_blank">More Commands</a>

<h4>Prisma</h4>

```
cd backend/
```

- Open Prisma Studio

```
npx prisma studio
```

- Update changes done to prisma.schema

```
npx prisma migrate dev --name MODELNAME-model
npx prisma db pull
npx prisma generate
```

- Reset Database

```
npx prisma migrate reset
```

## Docker

Commands to clean docker related stuff

```
docker stop $(docker ps -qa); \
docker rm $(docker ps -qa); \
docker rmi -f $(docker images -qa); \
docker volume rm $(docker volume ls -q); \
docker network rm $(docker network ls -q)
```
