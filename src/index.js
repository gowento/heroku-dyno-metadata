import _ from 'lodash';

export const mapping = {
  'x-heroku-app-id': 'HEROKU_APP_ID',
  'x-heroku-app-name': 'HEROKU_APP_NAME',
  'x-heroku-dyno-id': 'HEROKU_DYNO_ID',
  'x-heroku-dyno-name': 'DYNO',
  'x-heroku-slug-commit': 'HEROKU_SLUG_COMMIT',
  'x-heroku-slug-description': 'HEROKU_SLUG_DESCRIPTION',
  'x-heroku-release-created-at': 'HEROKU_RELEASE_CREATED_AT',
  'x-heroku-release-version': 'HEROKU_RELEASE_VERSION',
};

function getHeaders(keys = _.keys(mapping)) {
  return _(mapping)
    .pick(keys)
    .mapValues(value => process.env[value])
    .omitBy(_.isUndefined)
    .value();
}

export default function (keys) {
  return function expressMiddleware(req, res, next) {
    const headers = getHeaders(keys);
    res.set(headers);
    if (headers) {
    }

    next();
  };
}
