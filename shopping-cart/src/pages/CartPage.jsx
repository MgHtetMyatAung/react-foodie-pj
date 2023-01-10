import React, { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import {BsFillTrashFill} from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const {state:{cart},dispatch}= useStateContext();
    const [total,setTotal]= useState(0);
    const navigate= useNavigate();

    useEffect(()=>{
        setTotal(cart.reduce((pv,cv)=>pv+cv.price,0));
    },[]);

    const checkoutHandle=()=>{
        dispatch({type:'REMOVE_ALL_CART'});
        navigate('/success');
    }
  return (
    <div className='grid grid-cols-4'>
        <div className='my-5 flex flex-col gap-5 col-span-3'>
            {
                cart.map(item=>
                <div key={item.id} className="flex gap-5">
                    <div className='w-[150px] lg:w-[180px]'>
                        <img src={item.image} alt="" className='h-[80px] lg:h-[100px] mx-a'/>
                    </div>
                    <div className='py-3'>
                        <h3>{item.title}</h3>
                        <p>{item.price} $</p>
                        <p>{item.qty}</p>
                        <BsFillTrashFill size={20} className='text-danger' onClick={()=>dispatch({type:'REMOVE_FROM_CART',payLoad:item})}/>
                    </div>
                </div>)
            }
        </div>
        <div className='col-span-1'>
            <div className='flex flex-col shadow-lg w-full p-5 gap-3 mb-3'>
                <h1 className='text-xl font-bold'>Total : $ {total}</h1>
                <button onClick={checkoutHandle} className='w-40 py-2 px-3 bg-info text-white rounded'>Checkout</button>
            </div>
            <button className='py-2 px-4 bg-danger text-white rounded-lg' onClick={()=>dispatch({type:'REMOVE_ALL_CART'})}>Remove All</button>
        </div>
    </div>
  )
}

export default CartPage;