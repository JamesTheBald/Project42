import React, { useRef } from 'react'   // , { useState, useRef }
import Draggable from 'react-draggable'

const styles = {
  homeButtonWrapper: {
    position: 'fixed',
    bottom: 20,
    right: 40,
    background: '#B88',
    padding: 10
  }
}

const bounds = { bottom: 0, right: 0 };


const HomeButtonProvider = () => {

  let oldPosition = useRef( {x:100,y:100} );

  const handlerOnStop = (evnt, data) => {
    evnt.stopPropagation();             //J: I think this is important. Don't want bubbling.?
    console.log("x=",data.x, " y=",data.y);
    console.log("oldPosition.current.x = ", oldPosition.current.x, "oldPosition.current.y = ", oldPosition.current.y )
    
    if (data.x === oldPosition.current.x && data.y === oldPosition.current.y) {
      console.log("You just clicked! Put call to open MainModal here");
    }

    oldPosition.current = {x:data.x, y:data.y};
  }

  return (
    <>
      <Draggable
        bounds={bounds}
        // position={position}
        onStop={handlerOnStop}
      >
        <div style={styles.homeButtonWrapper}>HERE</div>
      </Draggable>
    </>
  )
}

export default HomeButtonProvider