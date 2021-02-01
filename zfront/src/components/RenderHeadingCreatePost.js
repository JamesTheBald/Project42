import React from 'react'

const RenderHeadingCreatePost = (props) => {

  const renderHeadingCreatePst = props.renderHeadingCreatePst;

  if (renderHeadingCreatePst) {
    return (
      <div className="text-2xl">Create Post</div>
    )
  }
}

export default RenderHeadingCreatePost