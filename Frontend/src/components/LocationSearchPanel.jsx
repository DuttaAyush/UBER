import React from 'react'

const LocationSearchPanel = (props) => {


    // sample array for locations
    const locations = [
        "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "25A, Opposite Sheryians Coding School, Bhopal",
        "26C, Next to Sheryians Coding School, Bhopal",
        "27D, Behind Sheryians Coding School, Bhopal",
    ]
    return (
        <div>

            {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl my-2 items-center my-4 justify-start'>
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill text-xl'></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }


        </div>
    )
}

export default LocationSearchPanel