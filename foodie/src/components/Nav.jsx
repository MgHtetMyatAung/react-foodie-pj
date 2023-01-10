import React from 'react';
import {RiRestaurant2Fill} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
        <Link to={'/'}>
            <div className='flex items-center py-5'>
              <RiRestaurant2Fill size={30} className="text-red-500"/>
              <p className='text-xl font-semibold'>Foodie</p>
            </div>
        </Link>
  )
}

export default Nav;