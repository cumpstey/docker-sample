import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import reducers from '../reducers';

import authHandler from '../middleware/authHandler';
import errorHandler from '../middleware/errorHandler';
//import modalHandler from '../middleware/modalHandler';
//import dropdownHandler from '../middleware/dropdownHandler';
// import paginationHandler from '../middleware/paginationHandler';
// import tableSortHandler from '../middleware/tableSortHandler';
// import homeRedirectHandler from '../middleware/homeRedirectHandler';
import formHandler from '../middleware/formHandler';

const history = createBrowserHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  connectRouter(history)(reducers),
  //initialState,
  composeEnhancer(
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk,
      authHandler,
      errorHandler,
      formHandler,
      // ... other middlewares ...
    )
  )

  // reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(
  //   thunk,
  //   router,
  //   authHandler,
  //   errorHandler,
  //   // modalHandler,
  //   // dropdownHandler,
  //   // paginationHandler,
  //   // tableSortHandler,
  //   // homeRedirectHandler,
  //   formHandler,
  // ),
);
