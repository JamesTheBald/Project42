import React, { useEffect, useState } from 'react'

const { submitNewPosting } = require('./functions');    //I tried import but got 'Blah is not a function' errors


function InputSection() {

  return (
    <div  className="flex flex-col p-4 my-2 w-3/4 border-2 rounded-xl border-gray-600">

      <div className="font-500 mb-3">Submit a new posting</div>

        <div className="flex flex-row justify-around">
          <input id="newPostingTitle" type="text" placeholder=" Enter posting details" 
                className="w-3/4 border border-gray-900 bg-gray-200"/>
          <div className="w-32 py-1 flex justify-center bg-gray-300" onClick={ () => submitNewPosting()}>Submit</div> 
        </div>
      
    </div>

  )
}

export default InputSection
