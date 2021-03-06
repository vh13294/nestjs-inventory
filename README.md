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
```

## Update
npm update (include cli)
npx nest info
npm outdated
npx npm-check-updates -u


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


## PRISMA
npm install @prisma/cli --save-dev
npm install @prisma/client

npx prisma init

npx prisma introspect // after database schema changes
npx prisma generate // after database schema changes

npx prisma studio
npx @prisma/codemods update-2.12 ./  // automatically update

### Migration
npx prisma db push // during development
npx prisma migrate dev --preview-feature
npx prisma migrate reset --preview-feature

npx prisma migrate save
npx prisma migrate save --preview
npx prisma migrate save --name "First migration"

npx prisma migrate up
npx prisma migrate up --preview
npx prisma migrate up "First migration"
npx prisma migrate up 20200223181448 // Apply all migrations necessary up to
// also apply to down


### Seeder
npm run seeder

npm install faker --save-dev
npm install @types/faker --save-dev


## Docker
docker-compose up -d


## PM2
npm i -D pm2
// update
ecosystem.config.js
npm run pm2:start

## Sentry.io
npm i --save @ntegral/nestjs-sentry
npm i --save nest-raven // prefer

// typescript source map // wont map external package
// https://stackoverflow.com/a/59001971/9433621
// https://docs.sentry.io/platforms/node/typescript/
npm i --save @sentry/integrations


## DotENV
npm install dotenv

// for testing
node -r dotenv/config your_script.js dotenv_config_path=.env.testing

// use only one env?
cp env/.env.development .env


## Reminder
git pull master vs git pull --rebase master

xss (inner html, inject http:</script> link via email) client view target page(add on injected script), 
csrf (one-click attack or session riding) forge a link to send http to attacker that include session/cookie
// or http://bank.com/transfer.do?acct=BOB&amount=100 link that mimic http request action


## Todo
add db migration & seeder
pm2 config file, web monitor
### Scheduling
Add scheduling (dynamic load node_instance_num == 0)
// also test for blocking event loop?
// such as long running prisma create
### or Use bull MQ, with taskforce.sh online monitoring,
// include schedule && other features
https://github.com/nestjs/bull/issues/202
### Authorization
// Role based, with Nest Guard for admin/user/manager
### Others
- mysql backup using package.json bin & mysql dump child process
- https://dev.to/bahdcoder/mysql-backups-with-node-js-1bn1

- CI/CD using github action, (store .env on instance and move with command)