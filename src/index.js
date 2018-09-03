import _ from 'lodash';

const headerPrefix = 'x-heroku';

export const mapping = {
  appId: 'HEROKU_APP_ID',
  appName: 'HEROKU_APP_NAME',
  dynoId: 'HEROKU_DYNO_ID',
  dynoName: 'DYNO',
  slugCommit: 'HEROKU_SLUG_COMMIT',
  slugDescription: 'HEROKU_SLUG_DESCRIPTION',
  releaseCreatedAt: 'HEROKU_RELEASE_CREATED_AT',
  releaseVersion: 'HEROKU_RELEASE_VERSION',
};

const metadata = _.mapValues(mapping, value => process.env[value]);

function getHeaders(keys) {
  return _(metadata)
    .mapKeys((val, key) => `${headerPrefix}-${_.kebabCase(key)}`)
    .pickBy(
      (val, key) => (keys ? _.includes(_.map(keys, _.toLower), key) : true)
    )
    .omitBy(_.isUndefined)
    .value();
}

export function middleware(keys) {
  return (req, res, next) => {
    const headers = getHeaders(keys);
    if (headers) {
      res.set(headers);
    }

    next();
  };
}

export default metadata;
