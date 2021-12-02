import {createStore,compose} from 'redux';
import reducer from './reducers/index';

//const store=createStore(reducers,{},+ window.__REDUX__DEVTOOLS_EXTENSION_&&window.__REDUX__DEVTOOLS_EXTENSION__())
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,composeEnhancers())


export default store;