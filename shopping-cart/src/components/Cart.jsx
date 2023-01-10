import React from 'react';
import {AiFillStar} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';

const Cart = ({item}) => {
    const {image,price,rating:{rate},title}= item;
    const {dispatch}= useStateContext();
  return (
    <div className='w-[90%] md:w-1/3 lg:w-1/5 border p-3 transition-all duration-300 hover:rotate-1 hover:shadow-md rounded-md shadow'>
        <img src={image} alt=""  className='h-[150px] mx-auto'/>
        <p className='text-header font-semibold text-lg my-3'>{String(title).substring(0,20)}</p>
        <div className="flex gap-2">
            <AiFillStar className='text-danger'/>
            <small>( {rate} )</small>
        </div>
        <p className='text-lg my-2'>{price} $</p>
        <div className='flex justify-between'>
            <button onClick={()=>dispatch({type:'ADD_TO_CART',payLoad:item})} className='bg-info text-white py-2 px-3 rounded-lg transition-all duration-200 active:scale-95'>Add to Cart</button>
            <Link to={`/details/${item.id}`}>
                <button className='bg-gray-500 text-white py-2 px-3 rounded-lg transition-all duration-200 active:scale-95'>Details</button>
            </Link>
        </div>
    </div>
  )
}

export default Cart;