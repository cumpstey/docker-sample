import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reducers from '../reducers';
import createDebounce from 'redux-debounced';

import authHandler from '../middleware/authHandler';
import errorHandler from '../middleware/errorHandler';
//import modalHandler from '../middleware/modalHandler';
//import dropdownHandler from '../middleware/dropdownHandler';
// import paginationHandler from '../middleware/paginationHandler';
// import tableSortHandler from '../middleware/tableSortHandler';
// import homeRedirectHandler from '../middleware/homeRedirectHandler';
import formHandler from '../middleware/formHandler';

const router = routerMiddleware(browserHistory);

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    createDebounce(),
    thunk,
    router,
    authHandler,
    errorHandler,
    // modalHandler,
    // dropdownHandler,
    // paginationHandler,
    // tableSortHandler,
    // homeRedirectHandler,
    formHandler,
  ),
);
