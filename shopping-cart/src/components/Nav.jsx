import React from 'react';
import {SiShopify} from 'react-icons/si';
import {FaSearch, FaShoppingCart} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';

const Nav = () => {
    const {setSearch,search,state:{cart}}= useStateContext();
  return (
    <div className='flex flex-col gap-2 mt-2 md:mt-0 md:flex-row items-center justify-between py-2 px-3 shadow-md'>
        <Link to={'/'}>
            <div className='flex items-center gap-2 cursor-pointer'>
                <SiShopify size={25}/>
                <h1 className='uppercase text-xl tracking-wider font-semibold'>MM-Shop</h1>
            </div>
        </Link>
        <div className='flex items-center gap-3'>
            <Link to={'/cartPage'}>
                <div className='flex py-2 px-3 text-primary bg-gray-500 rounded-full gap-2 cursor-pointer'>
                    <FaShoppingCart size={20}/>
                    <span className='text-sm'>{cart.length}</span>
                </div>
            </Link>
            <div className='flex items-center border border-gray-400 py-2 px-3 rounded-full gap-2'>
                <FaSearch className='text-gray-400'/>
                <input value={search} type="text" onChange={(e)=>setSearch(e.target.value)} className='focus:outline-none'/>
            </div>
        </div>
    </div>
  )
}

export default Nav;