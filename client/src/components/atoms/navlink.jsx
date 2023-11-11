import React from 'react'

function Navlink(props) {
  return (
    <div className="navlink mx-2 px-2 text-white font-semibold">
      <a href={props.url}>{props.name}</a>
    </div>
  )
}

export default Navlink