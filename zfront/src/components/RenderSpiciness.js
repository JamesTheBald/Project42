import React from 'react'
import { GiChiliPepper } from "react-icons/gi";

const RenderSpiciness = ({spiciness}) => {

  return (
    <div>
      <div className="flex justify-end">{
        (spiciness === "") ?
        <></>
        :
        (spiciness === "mild") ?
        <>
          <GiChiliPepper size="20" className="text-green-600"/>
        </>
        :
        (spiciness === "medium") ?
        <>
          <GiChiliPepper size="20" className="text-yellow-500"/>
          <GiChiliPepper size="20" className="text-yellow-500"/>
        </>
        :
        (spiciness === "spicy") ?
        <>
          <GiChiliPepper size="20" className="text-red-500"/>
          <GiChiliPepper size="20" className="text-red-500"/>
          <GiChiliPepper size="20" className="text-red-500"/>
        </>
        :
        <></>
      }
      </div>
    </div>
  )
}

export default RenderSpiciness
