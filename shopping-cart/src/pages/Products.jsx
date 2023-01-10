import React from 'react';
import Cart from '../components/Cart';
import { useStateContext } from '../context/StateContext';
import { SyncLoader } from 'react-spinners';

const Products = () => {
  const {state:{products}}= useStateContext();
  return (
    <>
      {
        products.length<1? <div className='w-full text-center mt-[200px]'>
                                <SyncLoader color="#36d7b7" />
                            </div> 
        :
        (
          <div className='flex flex-wrap justify-center gap-5 my-10'>
            {
              products?.map(item=>
                <Cart key={item.id} item={item}/>
              )
            }
          </div>
        )
      }
    </>
  )
}

export default Products;