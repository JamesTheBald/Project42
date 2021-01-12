import React from 'react'

function LoadPostingsOntoPage (props) {
  console.log("Loading postings=",props)

  if (props !== "") {
    props.map (posting => {
      return (
        <div>
          {posting.content}
        </div>
      )
    })
  }

}

export default LoadPostingsOntoPage;