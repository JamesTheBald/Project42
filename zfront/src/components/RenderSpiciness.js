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
          <GiChiliPepper size="18" className="text-gray-500"/>
        </>
        :
        (spiciness === "medium") ?
        <>
          <GiChiliPepper size="18" className="text-gray-500"/>
          <GiChiliPepper size="18" className="text-gray-500"/>
        </>
        :
        (spiciness === "spicy") ?
        <>
          <GiChiliPepper size="18" className="text-gray-500"/>
          <GiChiliPepper size="18" className="text-gray-500"/>
          <GiChiliPepper size="18" className="text-gray-500"/>
        </>
        :
        <></>
      }
      </div>
    </div>
  )
}

export default RenderSpiciness
