import { createBrowserHistory } from 'history'

import { routes } from './routes';

const history = createBrowserHistory({
    basename: routes.app,
});

export default history;