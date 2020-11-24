## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

npm install --save @nestjs/swagger swagger-ui-express

-To generate DTO
npm run build
https://docs.nestjs.com/openapi/cli-plugin

http://localhost:3000/api


## Generator
npx nest generate --help
npx nest g module inventories
npx nest g controller inventories
npx nest g service inventories


## ENV
npm i --save @nestjs/config


## PRISMA
npm install @prisma/cli --save-dev
npm install @prisma/client

npx prisma init

npx prisma introspect // after database schema changes
npx prisma generate // after database schema changes

# Migration
npx prisma db push // during development

npx prisma migrate save
npx prisma migrate save --preview
npx prisma migrate save --name "First migration"

npx prisma migrate up
npx prisma migrate up --preview
npx prisma migrate up "First migration"
npx prisma migrate up 20200223181448 // Apply all migrations necessary up to
// also apply to down

## Seeder
npm run seeder

npm install chance --save-dev
npm install @types/chance --save-dev

## Update
npm update (include cli)
<!-- npx @nestjs/cli update -->
npx nest update <!-- local -->
npx nest update -f -t latest <!-- local -->
npx nest info
npm outdated
npx npm-check-updates -u


## Docker
docker-compose up -d


## Todo
add db migration & seeder
