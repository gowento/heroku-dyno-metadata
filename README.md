# heroku-dyno-metadata

Access Heroku Dyno metadata in Node.js and expose them as HTTP headers.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

## Install

```sh
# Using npm
npm install heroku-dyno-metadata
```

```sh
# Using yarn
yarn add heroku-dyno-metadata
```

[Dyno Metadata](https://devcenter.heroku.com/articles/dyno-metadata) is an Heroku Labs feature at the moment and have to be enabled this way:

```sh
heroku labs:enable runtime-dyno-metadata -a <app name>
```

## Usage with Express 4.x

```js
import express from 'express';
import { middleware as herokuDynoMetadata } from 'heroku-dyno-metadata';

const app = express().use(herokuDynoMetadata());

// Responses will have the following example headers:
//
// X-Heroku-App-Id: 2d9a4aaf-1023-4520-8ed1-d6fda6fd86d6
// X-Heroku-App-Name: heroku-dyno-metadata
// X-Heroku-Dyno-Id: d1576980-3f3e-4593-b7b9-6c2fbf874e07
// X-Heroku-Dyno-Name: web.1
// X-Heroku-Slug-Commit: cbdae5a0cd1f5a0f0a67b3d82844ceb33d0caed7
// X-Heroku-Slug-Description: Deploy cbdae5a
// X-Heroku-Release-Created-at: 2016-04-08T06:39:53Z
// X-Heroku-Release-Version: v832
```

## API

#### metadata

**`metadata`**

- This function is exposed as the `default` export.
- Use `import metadata from 'heroku-dyno-metadata'` or `require('heroku-dyno-metadata')`.
- Returns an object containing Heroku Dyno metadata, keys are camel-cased.
- Example:

  ```js
  console.log(metadata.dynoName);
  // "web.1"
  ```

#### middleware

**`middleware([keys])`**

- Use `import { middleware } from 'heroku-dyno-metadata'` or `require('heroku-dyno-metadata').middleware`.
- Returns an Express middleware.
- The optional `keys` argument allows picking headers exposed. Default is all headers available (listed below).
- Example:

  ```js
  middleware(['x-heroku-app-id', 'x-heroku-dyno-id']);
  ```

## Available headers

| Header                      | Description                                | Example                                    |
| --------------------------- | ------------------------------------------ | ------------------------------------------ |
| x-heroku-app-id             | The unique identifier for the application  | `9daa2797-e49b-4624-932f-ec3f9688e3da`     |
| x-heroku-app-name           | The application name                       | `example-app`                              |
| x-heroku-dyno-id            | The dyno identifier                        | `1vac4117-c29f-4312-521e-ba4d8638c1ac`     |
| x-heroku-dyno-name          | The dyno name                              | `web.1`                                    |
| x-heroku-slug-commit        | The commit hash for current release        | `2c3a0b24069af49b3de35b8e8c26765c1dba9ff0` |
| x-heroku-slug-description   | The commit description for current release | `Deploy 2c3a0b2`                           |
| x-heroku-release-created-at | The time and date the release was created  | `2015/04/02 18:00:42`                      |
| x-heroku-release-version    | The version of current release             | `v42`                                      |

More information: [Heroku Labs: Dyno Metadata](https://devcenter.heroku.com/articles/dyno-metadata)

## License

MIT © [Gowento](https://www.gowento.com)

[npm-url]: https://npmjs.org/package/heroku-dyno-metadata
[npm-image]: https://img.shields.io/npm/v/heroku-dyno-metadata.svg?style=flat-square
[travis-url]: https://travis-ci.org/gowento/heroku-dyno-metadata
[travis-image]: https://img.shields.io/travis/gowento/heroku-dyno-metadata.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/gowento/heroku-dyno-metadata
[coveralls-image]: https://img.shields.io/coveralls/gowento/heroku-dyno-metadata.svg?style=flat-square
[depstat-url]: https://david-dm.org/gowento/heroku-dyno-metadata
[depstat-image]: https://david-dm.org/gowento/heroku-dyno-metadata.svg?style=flat-square
[download-badge]: http://img.shields.io/npm/dm/heroku-dyno-metadata.svg?style=flat-square
