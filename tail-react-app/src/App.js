import {
   BrowserRouter as Router,      // Router may show as unused but it is necessary
   Switch,
   Route,
  //  Link
 } from "react-router-dom";
import './App.css';

import Welcome from './components/Welcome';
import LinkHome from './components/LinkHome.js';
import Tech from "./components/Tech/Tech";


function App() {
  return (
    <div>
      <Switch>

        {/* From the React Router explanation page, https://reactrouter.com/web/guides/primary-components */}

            {/* Note how these two routes are ordered. The more specific path="/contact/:id" comes before path="/contact" so that route will render when viewing an individual contact */}

            {/* If the current URL is /contact/:id, this route is rendered while the rest are ignored */}
            {/* <Route path="/contact/:id">
                div content
            </Route> */}

            {/* <Route path="/contact">
                div content
            </Route> */}

          {/* psst... The contact:id page is accessed by this link:
            <Link to="/contact/:id">Link to contact/:id page</Link> */}



        <Route path="/tech"> <Tech/> </Route>


        <Route path="/process">
          <div className="title text-blue-600">
            This is the Coding Process Topics page
          </div>
          <LinkHome/>
          {/* Let's make this it's own component, in its own file. e.g. <Process /> */}
        </Route>


        <Route path="/people">
          <div className="title text-red-600">
            This is the 'Coding People' Topics page
          </div>
          <LinkHome/>
          {/* Let's make this it's own component, in its own file. e.g. <People /> */}
        </Route>


        {/* Path="/" *always* matches the URL because all URLs begin with /. So this route serves as a fallback */}
        <Route path="/"> <Welcome /> </Route>

      </Switch>
    </div>
  );
}

export default App;
