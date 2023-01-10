import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({item}) => {
  return (
    <div className='w-[95%] md:w-[45%] lg:w-[30%] 2xl:w-[20%] bg-white p-3 rounded-md flex flex-col transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-xl hover:rotate-2'>
        <img src={item.strMealThumb} alt="photo" className='w-full h-[200px] object-cover rounded'/>
        <h1 className='text-xl font-semibold my-3'>{item.strMeal}</h1>
        <button className='bg-green-500 text-white py-1 px-4 rounded-md transition-all duration-300 active:bg-green-600 mt-auto w-1/2 mx-auto'>
            <Link to={`/details/${item.idMeal}`}>Detail</Link>
        </button>
    </div>
  )
}

export default Card;