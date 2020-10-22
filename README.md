# Greeting

Luthierotero web page

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

| Framework | Version  |
| ----------| -------- |
| Node      | 12.XX.XX |
| NPM       | 6.XX.XX  |

### Download and install dependencies

```shell
$ git clone https://github.com/yosama/luthierotero.git
$ cd luthierotero
$ npm install
```

### Usage

```shell
npm start-dev
```

## API v1 info TODO

### Swagger 

The API can be used with the path: 
[API V1](http://localhost:3000/api)


## General configuration TODO

### Environment variables

| Name                  | Description                                | Default                      |
| --------------------- | ------------------------------------------ | -----------------------------|
| API_HOST              | API host                                   | `0.0.0.0`                    |
| API_PORT              | API port                                   | `3000`                       |
| NODE_ENV              | Production or development mode             | `development`                |
| LOGGING_LEVEL         | Logs level                                 | `INFO`                       |



## Running the tests TODO

### Unit tests

```shell
npm run test:unit
```

### E2E tests

```shell
npm run test:e2e
```

### Integration tests

```shell
npm run test
```

## Built With

* [Express](https://expressjs.com/en/4x/api.html) - The web framework used

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.org/yosama/luthierotero/branch/master/tags).


### Generate Release

```shell
npm run release
```

## Docker TODO

### Generate development Docker image
```shell
npm run build:dev-image
```
### Generate production Docker image
```shell
npm run build:pro-image
```
### Docker compose
```shell
docker-compose up luthierotero
```

### Docker hub repository
[Luthierotero repository](https://hub.docker.com/repository/docker/yosamac/luthierotero)


## License

[ISC](https://choosealicense.com/licenses/isc/)
