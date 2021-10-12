# Mercury Explorer

> Statechain explorer for [Mercury](https://github.com/commerceblock/mercury)

# Configuration

Server configurations can be set in `api/app/config/db.config.js`

| Name                    | Type    | Structure                                             |
| url                     | string  | mongodb://user:password@host:port/db&authSource=admin |

## Install api
Install with [npm](https://www.npmjs.com/):

```sh
$ cd api
$ npm install && npm run server
```

## Install client
Install with [npm](https://www.npmjs.com/):

```sh
$ cd client
$ npm install && npm start
```

### Running tests

Running and reviewing unit tests

```sh
$ npm install && npm test
```

### Licence
Mercury Explorer is released under the terms of the GNU General Public License. See for more information https://opensource.org/licenses/GPL-3.0