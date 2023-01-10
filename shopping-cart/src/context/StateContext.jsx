import { useState } from "react";
import { useReducer, useEffect, useContext, createContext } from "react";
import {getData} from '../api';

const StateContext= createContext();

export const StateContextProvider=({children})=>{
    const [search,setSearch]= useState('');
    const [productList,setProductList]= useState([]);

    const initialState={
        products:[],
        cart:[],
    }

    const reducer=(state,action)=>{
        switch (action.type) {
            case "GET_PRODUCT":
                return {...state,products:action.payLoad}
                ;
            case "ADD_TO_CART":
                const item= action.payLoad;
                const isExisted= state.cart.find(c=> c.id===item.id);
                if(isExisted){
                    return{
                        ...state,cart: state.cart.map(c=>c.id===item.id?{...item}:{...c})
                    }
                }else{
                    return{
                        ...state, cart: [...state.cart,{...item}]
                    }
                }
                ;
            case "REMOVE_FROM_CART":
                return {...state, cart:state.cart.filter(item=>item.id!==action.payLoad.id)}
                ;
            
            case "REMOVE_ALL_CART":
                return {...state, cart:[]}
                ;
        
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(reducer,initialState);

    const getProducts= async()=>{
        const data= await getData('/products');
        setProductList(data);
    }

    useEffect(()=>{getProducts()},[]);

    useEffect(()=>{
        dispatch({type:'GET_PRODUCT',payLoad: productList});
        const filterProducts= productList.filter(pd=> pd.title.toLowerCase().includes(search.toLowerCase()));
        dispatch({type:'GET_PRODUCT',payLoad: filterProducts});
    },[productList,search])

    const data={state,search,setSearch,dispatch}
    return (
        <StateContext.Provider value={data}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext=()=> useContext(StateContext);