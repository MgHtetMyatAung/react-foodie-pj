import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData } from '../api';
import { useStateContext } from '../context/StateContext';
import {SyncLoader} from 'react-spinners';

const Details = () => {
    const {id}= useParams();
    const [product,setProduct]= useState([]);
    const [categories,setCategories]= useState([]);
    const {dispatch}= useStateContext();
    const getProductDetail=async()=>{
        setProduct( await getData(`/products/${id}`))
        setCategories( await getData(`/products/category/${product.category}`))
    }

    useEffect(()=>{
        getProductDetail()
    },[product,categories])

  return (
    <>
        {
            categories.length<1? 
            <div className='w-full text-center mt-[200px]'>
                <SyncLoader color="#36d7b7" />
            </div>
            :
            (
                <div>
                    <div className='flex my-10 gap-5'>
                        <img src={product?.image} alt="" className='h-[250px]'/>
                        <div className='flex flex-col gap-3'>
                            <h3>Title : {product?.title}</h3>
                            <p> Category : {product?.category}</p>
                            <div className=''>
                                <p>Description</p>
                                <p className='text-gray-400'>{product?.description}</p>
                            </div>
                            <p>Price : {product?.price}</p>
                            <div className='flex gap-4'>
                            <button className='bg-info text-white px-5 py-2 rounded-lg w-36' onClick={()=>dispatch({type:'ADD_TO_CART',payLoad:product})}>Add to Cart</button>
                            <Link to={'/success'}>
                                <button className='bg-header text-white px-5 py-2 rounded-lg w-36'>Buy Now</button>
                            </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>You may also like</h1>
                        <div className='flex flex-wrap gap-10 mt-5'>
                            {
                                categories?.filter(i=> i.id !==product.id).map(item=><div key={item.id} className="w-40 shadow-md p-5 rounded-lg">
                                                        <img src={item.image} alt="" className='h-32 mx-auto'/>
                                                    </div>)
                            }
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Details;