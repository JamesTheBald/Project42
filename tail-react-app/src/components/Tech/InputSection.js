import React from 'react'
const port = require("../misc.js");


function InputSection(props) {

  const setPost = props.setPost;


  // const onChange = (event) => {
  //   setValue(event.target.value);
  // };

  function handleSubmit(event) {

    const newPostingContent = event.target.value    // EVENT IS RETURNING AS UNDEFINED

    setPost((oldValues) => ({ ...oldValues, id:4,content:newPostingContent }));     // reference?

    fetch(`http://localhost:${port}/postings`, {                        
      method: 'post',                                           // send a post to API endpoint /postings to create the new posting
      headers: {"Content-Type": "application/json"},            // add a header to tell the server to expect json
      body: JSON.stringify({newPosting: newPostingContent})     // add the body with the new content
    })
    .then(
      setPost()     // Trigger postings to refresh
    )
  }



  return (
    <div  className="flex flex-col p-4 my-2 w-3/4 border-2 rounded-xl border-gray-600">

      <div className="font-500 mb-3">Submit a new posting</div>

        <div className="flex flex-row justify-around">
          <input id="newPostingTitle" type="text" placeholder=" Enter posting details" 
                className="w-3/4 border border-gray-900 bg-gray-200"/>
          <div className="w-32 py-1 flex justify-center bg-gray-300" onClick={ () => handleSubmit()}>Submit</div> 
        </div>
      
    </div>

  )
}

export default InputSection;
