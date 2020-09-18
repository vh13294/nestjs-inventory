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


## Extra

## Swagger

npm install --save @nestjs/swagger swagger-ui-express

npm run build to generate DTO
https://docs.nestjs.com/openapi/cli-plugin

http://localhost:3000/api


## Generator
npx nest generate --help
npx nest g module inventories
npx nest g controller inventories
npx nest g service inventories


## ENV
npm i --save @nestjs/config


## TypeORM
npm install --save @nestjs/typeorm typeorm mysql


## PRISMA
npm install @prisma/cli --save-dev
npx prisma init
npx prisma introspect // after database schema changes

npm install @prisma/client
npx prisma generate // after database schema changes

## Update
npm update (include cli)
<!-- npx @nestjs/cli update -->
npx nest update <!-- local -->
npx nest update -f -t latest <!-- local -->
npx nest info
npm outdated
npx npm-check-updates -u