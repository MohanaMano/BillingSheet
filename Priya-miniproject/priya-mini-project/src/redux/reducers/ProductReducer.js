import { ActionTypes } from "../contants/actiontype"

const initialState={
    products:[{id:1,
    title:"Mohana",
category:"Programmer"}]
}

export const ProductReducer=(state=initialState,{type,payload})
{
switch(type)
{
case ActionTypes.SET_PRODUCTS:
    return state;
    default:
        return state;
}}