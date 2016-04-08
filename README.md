# heroku-dyno-metadata

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> Express middleware to expose Heroku Dyno metadata as HTTP headers

## Install

```sh
npm i heroku-dyno-metadata
```

[Dyno Metadata](https://devcenter.heroku.com/articles/dyno-metadata) is an Heroku Labs feature at the moment and have to be enabled this way:

```sh
heroku labs:enable runtime-dyno-metadata -a <app name>
```

## Usage with Express 4.x

```js
import express from 'express';
import herokuDynoMetadata from 'heroku-dyno-metadata';

const app = express()
  .use(herokuDynoMetadata());

// Responses will have the following headers:
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
