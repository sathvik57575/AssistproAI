import { PricingTable } from '@clerk/clerk-react'
import React from 'react'


const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
        <div className='text-center'>
            <h1 className='text-slate-700 text-[42px] font-semibold'>Choose Your Plan</h1>
            <p className='text-gray-500 max-w-xl mx-auto my-2'>Start free and scale up. Select the plan that best fits your needs and start creating with our powerful AI tools today.</p>

            <div className='mt-14 max-sm:mx-8'>
                <PricingTable/>
            </div>
            
        </div>
    </div>
  )
}

export default Plan