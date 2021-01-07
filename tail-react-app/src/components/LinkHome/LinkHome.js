import React from 'react';
import {
   BrowserRouter as Router,      // Router may show as unused but it is necessary
   Link
 } from "react-router-dom";


const LinkHome = () => {
   return (
         <div className="subtitle">
            <Link to="/">Link to Welcome page</Link>
         </div>
   )
}

export default LinkHome