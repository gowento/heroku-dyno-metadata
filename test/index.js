import test from 'ava';
import _ from 'lodash';
import express from 'express';
import request from 'supertest-as-promised';

import metadata, { mapping, middleware } from '../src';

function expressApp(keys) {
  const app = express()
    .set('port', 0);

  app.use(middleware(keys));
  app.get('/', (req, res) => res.send());

  return app;
}

test('default export contains metadata object', t => {
  t.plan(_.size(mapping));

  _.forEach(mapping, (value, key) => {
    t.is(metadata[key], process.env[value]);
  });
});

test('middleware sets headers', async t => {
  t.plan(_.size(mapping) + 1);

  const res = await request(expressApp())
    .get('/');

  t.is(res.status, 200);
  _.forEach(mapping, (value, key) => {
    const header = `x-heroku-${_.kebabCase(key)}`;
    t.is(res.get(header), process.env[value]);
  });
});

test('middleware sets picked headers only', async t => {
  t.plan(_.size(mapping));

  const keys = ['x-heroku-app-id', 'X-Heroku-Dyno-Id', 'X-HEROKU-RELEASE-VERSION'];
  const res = await request(expressApp(keys))
    .get('/');

  _.forEach(mapping, (value, key) => {
    const header = `x-heroku-${_.kebabCase(key)}`;
    t.is(res.get(header), _.includes(_.map(keys, _.toLower), header) ? process.env[value] : undefined);
  });
});
