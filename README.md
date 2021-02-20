# Yunzhicloud Console

![](https://github.com/kubesphere/console/workflows/Main/badge.svg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

Yunzhicloud Console is the web-based UI of another theme for [KubeSphere](https://github.com/kubesphere/kubesphere) clusters.

![image](https://user-images.githubusercontent.com/77370954/108587295-d5d4ad00-738d-11eb-9abd-95d020caa997.png)
![image](https://user-images.githubusercontent.com/77370954/108587328-fac92000-738d-11eb-9a52-a01b25a76729.png)
![image](https://user-images.githubusercontent.com/77370954/108587454-922e7300-738e-11eb-9641-88700075f36a.png)

## Getting Started

A KubeSphere cluster is required before getting started.

Read [Installation](https://github.com/kubesphere/kubesphere#installation) guide to install a cluster.

Read [the guide](https://github.com/kubesphere/kubesphere#to-start-using-kubesphere) to start using KubeSphere.

Features Map:

![Features Map](docs/images/module-map.jpg)

## Developer Guide

### Preparation

Make sure the following software is installed and added to the \$PATH variable:

- A KubeSphere cluster ([Installation](https://github.com/kubesphere/kubesphere#installation))
- Node.js 10.16+ ([installation with nvm](https://github.com/creationix/nvm#usage))
- Yarn 1.19.1+

Install yarn with npm:

```sh
npm install -g yarn
```

Fork the repository, then clone your repository and install the dependencies:

```sh
yarn
```

Note: If you are in China Mainland, execute the following command before running the command above for faster installation.

```sh
yarn config set registry https://registry.npm.taobao.org
```

Alternatively you can start development using docker. See [Development with Docker](/docs/development-with-docker.md).

### Access the backend services of KubeSphere

Follow [the guide](/docs/access-backend.md) to configure the backend services.

### Start KubeSphere Console for development

```sh
yarn lego
yarn start
```

Now, you can access http://localhost:8000 to view the console using the default account admin / P@88w0rd.

### Run tests

```sh
yarn test
```

### Build KubeSphere Console for production

The project can be built for production by using the following task:

```sh
yarn build
```

To build and serve from dist, using the following task:

```sh
yarn serve
```

To build KubeSphere console to an image, run the following task after `yarn build`:

```sh
docker build -t ks-console .
```

Test KubeSphere console image by run:

```sh
./docker-run
```

## Development Workflow

Follow [Development Workflow](/docs/development-workflow.md) to commit your codes.

## Support, Discussion, and Community

If you need any help with KubeSphere, please join us at [Slack Channel](https://join.slack.com/t/kubesphere/shared_invite/enQtNTE3MDIxNzUxNzQ0LTZkNTdkYWNiYTVkMTM5ZThhODY1MjAyZmVlYWEwZmQ3ODQ1NmM1MGVkNWEzZTRhNzk0MzM5MmY4NDc3ZWVhMjE).

Please submit any KubeSphere Console bugs, issues, and feature requests to [KubeSphere Console GitHub Issue](https://github.com/kubesphere/console/issues).

## Contributing to the project

Welcome to contribute to KubeSphere Console, see [Contributing Guide](CONTRIBUTING.md).
