import React from 'react'

const RenderHeadingCreatePost = (props) => {

  const creatingNewPst = props.creatingNewPst;

  if (creatingNewPst) {
    return (
      <div className="text-2xl">Create Post</div>
    )
  }
}

export default RenderHeadingCreatePost