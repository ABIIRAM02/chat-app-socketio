'use client'
import Lottie from 'lottie-react'
import Animi from '../assets/Animation.json'

import { useSelector , useDispatch } from 'react-redux'
import { increment , decrement , incrementByAmount } from './GlobalRedux/Features/counter/CounterSlice' 
import Nav from '@/Components/Nav'

const Home = () => {

  const count = useSelector( state => state.counter.value )
  const dispatch = useDispatch() 

  return (

    // <section className='h-screen bg-myWhite overflow-hidden flex' >
    //   <div className='border border-black flex-1' >
    //   <h2 className='font-cursive  text-myYellow text-6xl' >Dood-Chat</h2>
    //   </div>
    //   <div className='h-full flex justify-end items-end flex-[2] relative '>
    //   <Lottie className='h-5/6 absolute -bottom-5 -right-16' animationData={Animi} />
    //   </div>
    // </section>

    <section>
            <Nav />
     <p>
      <button onClick={()=>{dispatch(increment())}} >Increment</button>
      </p> 
      <p>
      <button onClick={()=>{dispatch(decrement())}} >Decrement</button>
      </p>
      <p>
      <span>{count}</span>
      </p>
      <p>
      <button onClick={()=>{dispatch(incrementByAmount(2))}} >Increment by amt</button>
      </p>
      hay abii
    </section>
  )
}

export default Home