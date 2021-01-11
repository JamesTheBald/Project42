import React from 'react';
import {
   BrowserRouter as Router,      // Router may show as unused but it is necessary
   Link
 } from "react-router-dom";

// Note: This was just intended as an example of a very simple component. We should decide whether we actually want to use it or not.
const LinkHome = () => {
   return (
         <div className="subtitle">
            <Link to="/">Link to Welcome page</Link>
         </div>
   )
}

export default LinkHome