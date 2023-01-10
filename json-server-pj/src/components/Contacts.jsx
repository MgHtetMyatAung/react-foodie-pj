import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {MdDelete} from 'react-icons/md';
import {BiEdit} from 'react-icons/bi';
import {BsPlusLg} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Contacts = () => {
  const [data,setData]= useState([]);
  const apiFetch= async()=>{
    const {data}=await axios.get('http://localhost:3000/contacts').catch(e=>console.log(e.message))
    setData(data);
  }

  useEffect(()=>{
    apiFetch();
  },[])

  const apiDeleteContact=(id)=>{
    Swal.fire({
      title: 'Are you sure to delete?',
      text: "You won't be able to restore this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your contact has been deleted.',
          'success'
        )
        const {data}= await axios.delete(`http://localhost:3000/contacts/${id}`);
        apiFetch();

      }
    })
  }
  return (
    <div className='container mx-auto xl:w-[1400px]'>
        <button className='py-2 rounded-lg px-4 bg-gray-700 text-white my-3'>
          <Link to={'/create'} className='flex items-center gap-2'>Add New <BsPlusLg size={13}/></Link>
        </button>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email 
                </th>
                <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                  Phone 
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data?.map(user=>(
                  <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                      {user.name}
                    </th>
                    <td className="py-4 px-6">
                      {user.email}
                    </td>
                    <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                      {user.phone}
                    </td>
                    <td className="py-4 px-6 flex gap-3 justify-center">
                      <Link to={`/edit/${user.id}`}>
                          <BiEdit size={20} className="text-gray-500 cursor-pointer"/>
                      </Link>
                      <MdDelete size={20} className="text-red-500 cursor-pointer" onClick={()=>apiDeleteContact(user.id)}/>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Contacts;