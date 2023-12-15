import React from 'react'

function ChannelCard({name, icon}) {
  return (
    <div className='w-full shadow-lg rounded-2xl p-5 mb-4 h-[150px] flex items-center content-center justify-center dark:bg-slate-800 overflow-hidden bg-white'>
      <img src={icon} alt="" />
    </div>
  )
}

export default ChannelCard