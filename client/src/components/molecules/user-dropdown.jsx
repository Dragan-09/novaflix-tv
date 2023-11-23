import React from 'react'
import dateFormat from 'dateformat'
import Button from '../atoms/button'

function UserDropdown({full_name, username, current_plan}) {
  const end_date_format = dateFormat(current_plan.end_date, "dd mmm yyyy")
  const diff_days = Math.abs(Math.floor((new Date() - new Date(current_plan.end_date)) / 8.64e+7))
  return (
    <div className='w-[300px] bg-white py-2 px-4 rounded-md relative z-10 shadow-lg animate-display'>
      <div className="w-full text-center py-4 border-b border-gray-500/40">
        <div className="w-full font-bold text-xl h-6">Hi, {full_name}!</div>
        <div className="w-full text-gray-500 text-sm">@{username}</div>
      </div>
      <div className="w-full pt-3 px-1 pb-4">
        <div className="w-full text-primary font-semibold text-md h-4">Current Plan</div>
        <div className="w-full ps-0.5">
          <div className="w-full font-semibold text-lg flex justify-between items-center">
            <span>{current_plan.name} Plan</span>
            <span className='block w-[10px] h-[10px] bg-active rounded-full'>
              <span className='block w-[10px] h-[10px] bg-active rounded-full animate-ping'></span>
            </span>
          </div>
          <div className="w-full text-gray-500 text-xs -mt-2">Ends in {end_date_format}, {diff_days} days remaining</div>
        </div>
      </div>
      <div className="w-full pt-2">
        <Button size={'medium'} style={'filled'} color={'primary'} className={'w-full justify-center'} >Sign out</Button>
      </div>
    </div>
  )
}

export default UserDropdown