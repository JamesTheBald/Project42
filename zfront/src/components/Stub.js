import React from 'react'
// import './css/tailwind_built.css';
// import './css/app.css';


const Stub = (props) => {

  const title = props.title;
  const contributors = props.contributors;
  const fromTop = props.fromTop;
  const fromLeft = props.fromLeft;

  return (
      <div className="w-56 px-3 py-3 bg-gray-200 rounded-lg absolute whitespace-nowrap" style={{top: fromTop, left: fromLeft}}>
        <div className="text-sm">{title} </div>
        <div className="pt-4 text-xs">{contributors}</div>
      </div>
  )
}

export default Stub
