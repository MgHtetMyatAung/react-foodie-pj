
import React, { useEffect, useState } from 'react'
import { apiFetch } from '../ApiFetch/ApiFetch';
import Card from './Card';
import Loading from './Loading';

const Categories = () => {
  const [meals,setMeals]=useState([]);
  const [load,setLoad]= useState(true);

  const url="/filter.php?c=Seafood";
  
  const getCategories= async(url)=>{
    const {data}= await apiFetch.get(url)
    .catch((e)=>alert(e.message));
    setMeals(data.meals);
    setLoad(false);
  }

  useEffect(()=>{
    getCategories(url);
  },[])

  return (
    <div>
      {
        load ?<Loading/>: 
        <div className='flex flex-wrap gap-5 justify-center'>
          {
            meals?.map(meal=><Card key={meal.idMeal}
            item={meal}/>)
          }
        </div>
      }
    </div>
  )
}

export default Categories