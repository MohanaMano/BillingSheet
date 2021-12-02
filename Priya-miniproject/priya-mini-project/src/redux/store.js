import {createStore} from 'redux';
import reducer from './reducers/index';
//const store=createStore(reducers,{},+ window.__REDUX__DEVTOOLS_EXTENSION_&&window.__REDUX__DEVTOOLS_EXTENSION__())

const store=createStore(reducer,{},+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


export default store;