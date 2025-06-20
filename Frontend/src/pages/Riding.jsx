import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 flex items-center bg-white justify-center rounded-full'>
                <i className='text-lg font-medium ri-home-5-line'></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://th.bing.com/th/id/R.578f6e7ec65c2ff02376bbc6d7256431?rik=6hMwL3YJReao1Q&riu=http%3a%2f%2fsimonpan.com%2fwp-content%2fthemes%2fsp_portfolio%2fassets%2fuber-challenge.jpg&ehk=%2bwFErRSi0XeYSyUY1Gfu0Rv7zSCtP4xDsvFKpAjsTRM%3d&risl=&pid=ImgRaw&r=0" alt="" />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberSelect.png" alt="" />
                    <div className='text-right '>
                        <h2 className='text-lg font-medium'>Ayush</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB1234</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>
                        
                        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                            <i className='text-lg ri-map-pin-2-fill'></i>
                            <div>
                                <h3 className='text-lg font-medium '>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 '>
                            <i className='text-lg ri-currency-line'></i>
                            <div>
                                <h3 className='text-lg font-medium '>$193.20</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>

                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>

            </div>
        </div>
    )
}

export default Riding