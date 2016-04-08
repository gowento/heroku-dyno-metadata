import test from 'ava';
import _ from 'lodash';
import express from 'express';
import request from 'supertest-as-promised';

import herokuDynoMetadata, { mapping } from '../src';

process.env.HEROKU_APP_ID = '2d9a4aaf-1023-4520-8ed1-d6fda6fd86d6';
process.env.HEROKU_APP_NAME = 'heroku-dyno-metadata';
process.env.HEROKU_DYNO_ID = 'd1576980-3f3e-4593-b7b9-6c2fbf874e07';
process.env.DYNO = 'web.1';
process.env.HEROKU_SLUG_COMMIT = 'cbdae5a0cd1f5a0f0a67b3d82844ceb33d0caed7';
process.env.HEROKU_SLUG_DESCRIPTION = 'Deploy cbdae5a';
process.env.HEROKU_RELEASE_CREATED_AT = '2016-04-08T06:39:53Z';
process.env.HEROKU_RELEASE_VERSION = 'v832';

function expressApp(keys) {
  const app = express();

  app.use(herokuDynoMetadata(keys));
  app.get('/', (req, res) => res.send());

  return app;
}

test('herokuDynoMetadata sets headers', async t => {
  t.plan(_.size(mapping) + 1);

  const res = await request(expressApp())
    .get('/');

  t.is(res.status, 200);
  _.forEach(mapping, (value, key) => {
    t.is(res.get(key), process.env[value]);
  });
});

test('herokuDynoMetadata sets selected headers', async t => {
  t.plan(_.size(mapping) + 1);

  const keys = ['x-heroku-app-id', 'x-heroku-dyno-id', 'x-heroku-release-version'];
  const res = await request(expressApp(keys))
    .get('/');

  t.is(res.status, 200);
  _.forEach(mapping, (value, key) => {
    t.is(res.get(key), _.includes(keys, key) ? process.env[value] : undefined);
  });
});
