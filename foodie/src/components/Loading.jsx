import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className=' text-center mt-[200px]'>
        <SyncLoader color="#36d7b7" />
    </div>
  )
}

export default Loading;