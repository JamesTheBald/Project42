import React from 'react'

const DisplayHeadingCreateCase = (props) => {

  const displayHeadingCreateCas = props.displayHeadingCreateCase;

  if (displayHeadingCreateCas) {
    return (
      <div className="text-2xl">Create Post</div>
    )
  }
}

export default DisplayHeadingCreateCase