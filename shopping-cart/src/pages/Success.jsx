import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate= useNavigate();
  return (
    <div className='w-1/2 mx-auto mt-10 h-[300px] flex flex-col justify-center items-center bg-blue-300 gap-5 animate__animated animate__bounce'>
        <h1 className='text-2xl'>Thanks For Purchasing</h1>
        <button className='text-primary bg-danger py-2 px-4 shadow-md uppercase rounded-md' onClick={()=>navigate('/')}>Go Shopping</button>
    </div>
  )
}

export default Success;