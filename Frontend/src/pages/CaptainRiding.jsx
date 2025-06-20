import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])


  return (
    <div className='h-screen relative'>

      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="" />
        <Link to='/captain-home' className=' h-10 w-10 flex items-center bg-white justify-center rounded-full'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src="https://th.bing.com/th/id/R.578f6e7ec65c2ff02376bbc6d7256431?rik=6hMwL3YJReao1Q&riu=http%3a%2f%2fsimonpan.com%2fwp-content%2fthemes%2fsp_portfolio%2fassets%2fuber-challenge.jpg&ehk=%2bwFErRSi0XeYSyUY1Gfu0Rv7zSCtP4xDsvFKpAjsTRM%3d&risl=&pid=ImgRaw&r=0" alt="" />

      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'
      onClick={()=>{
        setFinishRidePanel(true)
      }}
      >
        <h5 className='p-1 text-center w-[95%] absolute top-0' onClick={() => {

        }}><i className='text-3xl text-gray-800 ri-arrow-up-wide-line'></i></h5>
        <h4 className='text-xl font-semibold'>4 KM away </h4>
        <button className=' mt-5 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>

    </div>
  )
}

export default CaptainRiding