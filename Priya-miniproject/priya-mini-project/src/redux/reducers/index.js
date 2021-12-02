// When we create a application we have to combine all the multiple reducer in this index.js file

import {combineReducer} from 'redux';
import {ProductReducer} from './ProductReducer.js';

const reducer=combineReducer(
    {
        allproducts:ProductReducer;
    }
)
export default reducer;