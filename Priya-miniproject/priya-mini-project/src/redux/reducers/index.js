// When we create a application we have to combine all the multiple reducer in this index.js file

import {combineReducers} from 'redux';
import {ProductReducer,selectedProductReducer} from './ProductReducer.js';

const reducer = combineReducers(
    {
        allProducts: ProductReducer,
        product:selectedProductReducer,
    }
)
export default reducer;