import React from 'react'
import Draggable from 'react-draggable'

const styles = {
  homeButtonWrapper: {
    position: 'fixed',
    bottom: 20,
    right: 40,
    // height: 48,
    // width: 48,
    background: '#B88',
    padding: 10
  }
}

const bounds = {
  bottom: 0,
  right: 0
}

// Retrieve the postion coordinates from localStorage. Convert from JSON format to {x:x,y:y}
const getLocalPosition = () => {
  const position = localStorage.getItem('homeButtonPosition')
  const positionJSON = (position && JSON.parse(position)) || {}
  return {
    x: positionJSON.x || 0,
    y: positionJSON.y || 0
  }
}

// Save the postion coordinates to localStorage in JSON format
const setLocalPosition = (data) => {
  localStorage.setItem('homeButtonPosition', JSON.stringify(data))
}


const HomeButtonProvider = () => {
  const [position, setPosition] = React.useState(getLocalPosition())  // getLocalPosition()  {x:-200,y:-200}

  console.log("position=",position);

  const onStop = (e, data) => {
    e.stopPropagation()             // I think this is important
    const { x: lastX, y: lastY } = getLocalPosition()
    setPosition({
      x: data.x,
      y: data.y
    })
    setLocalPosition({
      x: data.x,
      y: data.y
    })

    // Simulate an onClick event as a drag with zero dx & dy. So if lastX=X and lastY=Y, run the function on the next line
    if (lastX === data.x && lastY === data.y) {
      console.log("You just clicked!")
    }
  }

  return (
    <>
      <Draggable
        bounds={bounds}
        position={position}
        onStop={onStop}
      >
        <div style={styles.homeButtonWrapper}>HERE</div>
      </Draggable>
    </>
  )
}

export default HomeButtonProvider