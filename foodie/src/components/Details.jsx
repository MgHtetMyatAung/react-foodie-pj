import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../ApiFetch/ApiFetch';
import { AiFillYoutube } from "react-icons/ai";
import Loading from './Loading';

const Details = () => {
  const[food,setFood]= useState([])
  const[load,setLoad]= useState(true);
  const {id}= useParams();
  const url=`/lookup.php?i=${id}`;
  const getSingleFood = async(url)=>{
    const {data}= await apiFetch.get(url)
    .catch((e)=>console.error(e))
      setFood(data?.meals[0]);
    setLoad(false);
  }

  useEffect(() => {
   getSingleFood(url)
  }, []);

  return (
    <>
        {
          load ? <Loading/> : 
          <div>
            <div className='flex flex-col lg:flex-row'>
              <img src={food.strMealThumb} alt="" className=' lg:w-1/2 h-[250px] md:h-[300px] object-cover rounded-lg shadow-md'/>
              <div className='py-5 lg:px-10'>
                <h1 className='text-xl font-semibold'>Name - {food.strMeal}</h1>
                <h2 className='text-lg my-2'>Food Category - {food.strCategory}</h2>
                <h2 className=' text-lg mb-5'>Country - {food.strArea}</h2>
                <a href={food.strYoutube}>
                  <AiFillYoutube size={40} className="text-red-500"/>
                  Watch on YouTube
                </a>
              </div>
            </div>
            <h1 className=' text-3xl font-semibold my-4 mt-8'>StrInstructions</h1>
            <p className=' lg:text-xl leading-10'>{food.strInstructions}</p>
          </div>
        }
    </>
  )
}

export default Details;