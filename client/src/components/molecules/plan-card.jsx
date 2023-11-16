import React from 'react'
import Icon from '../atoms/icon'
import Button from '../atoms/button'

function PlanCard({title, description, price, resubdesc, icon, main}) {
  return (
    <div className={`plan shadow shadow-xl rounded-3xl py-10 px-0 sm:px-10 sm:py-10 w-full text-center text-gray bg-white mx-auto dark:bg-slate-800 ${main ? "ssm:scale-110" : ""}`}>
      <div className="icon">
        <Icon icon={icon} width="100px" height="100px" className="mx-auto dark:grayscale" />
      </div>
      <div className="title capitalize text-4xl font-semibold pt-7 text-primary dark:text-white">{title}</div>
      <div className="description px-10 pt-7">{description}</div>
      <hr className="my-10 mx-10"/>
      <div className="price text-5xl font-light text-primary/80 dark:text-white/80">&#x24;{price}</div>
      <div className="resubscription text-sm pb-10">{resubdesc}</div>
      <Button size="large" style="rounded" color="text-white" content="Start Now" className={`${main ? "shadow shadow-xl shadow-primary/70 dark:text-white/70" : ""}`} />
    </div>
  )
}

export default PlanCard