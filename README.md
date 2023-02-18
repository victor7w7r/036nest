# 036nest

Useful NestJS template with embedded database and logging

## :warning: Test files not found

This template is used to be clean. Made with ❤️ by

![Alt text](brandwhite.png?raw=true "Title")

## API Routes for Test (Port 8080 by default)

``` Plain Text
GET http://localhost:8080/dummy/<id>
GET http://localhost:8080/dummy
POST http://localhost:8080/dummy
PUT http://localhost:8080/dummy/<id>
DELETE http://localhost:8080/dummy/<id>
```

``` JSON
{
    "id":"1234",
    "name":"foo"  // body in POST PUT
}
```

### Install Packages (Use pnpm)

``` bash
$ pnpm i
```
### Dev and Build

``` bash
$ pnpm dev
$ pnpm build
```

### Change to blank template

``` bash
$ git clone https://github.com/victor7w7r/036nest
$ cd 036nest
$ git checkout blank
```

## Features

- Fastify by default
- Clustering for expensive CPU calculations
- Embedded sqlite database
- DTO validation and mapping with `class-transformer` `class-validator`
- `x-api-key` authentication with `passport`
- Rate limit, helmet, cors is supported
- Socket.io is enabled by default with gateway example
- Logging with files
- Server app is compiled by webpack with one `main.js` executable
