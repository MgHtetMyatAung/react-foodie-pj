import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Create = () => {
  const [contact,setContact]= useState({
    id: null,
    name:'',
    email:'',
    phone:''
  })

  const navigate= useNavigate();

  const apiCreateContact= async(item)=>{
    const {data}= await axios.post('http://localhost:3000/contacts',item).catch(err=>console.log(err));
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleSubmit=(e)=>{
    e.preventDefault();
    apiCreateContact({...contact,id: Date.now()})

    Toast.fire({
      icon: 'success',
      title: 'Create contact is successfully'
    })

    navigate('/')
  }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <form className='md:w-1/2 lg:w-[450px] mx-auto' onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl font-semibold mb-6'>Create Contact</h1>
        <div className='mb-5'>
          <label htmlFor="" className='text-gray-600'>Enter Name</label>
          <input value={contact.name} onChange={(e)=>setContact({...contact,name:e.target.value})} type="text" className='w-full text-md border border-gray-500 px-3 py-2 mt-2 rounded-lg focus:outline-gray-500' placeholder=''/>
        </div>
        <div className='mb-5'>
          <label htmlFor="" className='text-gray-600'>Email Address</label>
          <input value={contact.email} onChange={(e)=>setContact({...contact,email:e.target.value})} type="text" className='w-full text-md border border-gray-500 px-3 py-2 mt-2 rounded-lg focus:outline-gray-500' placeholder='example@gmail.com'/>
        </div>
        <div className='mb-5'>
          <label htmlFor="" className='text-gray-600'>Phone Number</label>
          <input value={contact.phone} onChange={(e)=>setContact({...contact,phone:e.target.value})} type="number" className='w-full text-md border border-gray-500 px-3 py-2 mt-2 rounded-lg focus:outline-gray-500' placeholder='09-'/>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to contact</button>
        <Link to={'/'} className='ml-5'>
          <button className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Cancel</button>
        </Link>
      </form>
    </div>
  )
}

export default Create;