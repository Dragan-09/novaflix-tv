import React from 'react'
import Icon from '../atoms/icon'
import Button from '../atoms/button'

function PlanCard({title, description, price, resubdesc, icon, main}) {
  return (
    <div className={`plan shadow shadow-xl rounded-3xl p-10 w-[350px] text-center text-gray bg-white mx-auto ${main ? "scale-110" : ""}`}>
      <div className="icon">
        <Icon icon={icon} width="100px" height="100px" className="mx-auto" />
      </div>
      <div className="title capitalize text-4xl font-semibold pt-7 text-primary">{title}</div>
      <div className="description px-10 pt-7">{description}</div>
      <hr className="my-10 mx-10"/>
      <div className="price text-5xl font-light text-primary/80">&#x24;{price}</div>
      <div className="resubscription text-sm pb-10">{resubdesc}</div>
      <Button size="large" style="rounded" color="text-white" content="Start Now" extraClassNames={`${main ? "shadow shadow-xl shadow-primary/70" : ""}`} />
    </div>
  )
}

export default PlanCard