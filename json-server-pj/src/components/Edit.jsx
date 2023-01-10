import axios from 'axios';
import React,{useState} from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Edit = () => {
  const {id}= useParams();
  const navigate= useNavigate();
  const [contact,setContact]= useState({
    id: null,
    name:'',
    email:'',
    phone:''
  })
  const getSingleContact= async()=>{
    const {data}= await axios.get('http://localhost:3000/contacts/'+id).catch(err=>console.log(err));
    setContact({
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone
    })
  }

  const apiUpdateContact=async ()=>{
    const {data}= await axios.patch(`http://localhost:3000/contacts/${id}`,contact)

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

  const submitHandler=(e)=>{
    e.preventDefault();
    apiUpdateContact();
    
    Toast.fire({
      icon: 'success',
      title: 'Update is successfully'
    })

    navigate('/');
  }

  useEffect(()=>{
    getSingleContact();
  },[])
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <form className='md:w-1/2 lg:w-[450px] mx-auto' onSubmit={submitHandler}>
        <h1 className='text-center text-2xl font-semibold mb-6'>Edit Contact</h1>
        <div className='mb-5'>
          <label htmlFor="" className='text-gray-600'>Enter Name</label>
          <input defaultValue={contact.name} onChange={(e)=>setContact({...contact,name:e.target.value})} type="text" className='w-full text-md border border-gray-500 px-3 py-2 mt-2 rounded-lg focus:outline-gray-500' placeholder=''/>
        </div>
        <div className='mb-5'>
          <label htmlFor="" className='text-gray-600'>Email Address</label>
          <input defaultValue={contact.email} onChange={(e)=>setContact({...contact,email:e.target.value})} type="text" className='w-full text-md border border-gray-500 px-3 py-2 mt-2 rounded-lg focus:outline-gray-500' placeholder='example@gmail.com'/>
        </div>
        <div className='mb-5'>
          <label htmlFor="" className='text-gray-600'>Phone Number</label>
          <input defaultValue={contact.phone} onChange={(e)=>setContact({...contact,phone:e.target.value})} type="number" className='w-full text-md border border-gray-500 px-3 py-2 mt-2 rounded-lg focus:outline-gray-500' placeholder='09-'/>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
        <Link to={'/'} className='ml-5'>
          <button className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Cancel</button>
        </Link>
      </form>
    </div>
  )
}

export default Edit;