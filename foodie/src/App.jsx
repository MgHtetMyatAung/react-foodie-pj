import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Details from './components/Details';
import Nav from './components/Nav';


const App = () => {
  return (
    <div className='bg-gray-200 w-full min-h-[100vh]'>
      <div className=' w-[90%] lg:w-[80%] 2xl:w-[70%] mx-auto'>
          <Nav/>
          <Routes>
            <Route path='/' element={<Categories/>}/>
            <Route path='/details/:id' element={<Details/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default App;