import {
   BrowserRouter as Router,      // Router may show as unused but it is necessary
   Switch,
   Route,
   Link
 } from "react-router-dom";
import './App.css';
import LinkHome from "./components/LinkHome/LinkHome.js"

// import Home from '/components/home/Home';
// import About from '/components/about/About';
// import Contact from '/components/contact/Contact';
// import AllContacts from '/components/allcontact/AllContacts';


function App() {
  return (
    <div>
      <Switch>

        {/* From the React Router explanation page, https://reactrouter.com/web/guides/primary-components */}

            {/* Note how these two routes are ordered. The more specific path="/contact/:id" comes before path="/contact" so that route will render when viewing an individual contact */}
            {/* <Route path="/contact/:id">
                div content
            </Route> */}

            {/* <Route path="/contact">
                div content
            </Route> */}

          {/* psst... The contact:id page is accessed by this link:
            <Link to="/contact/:id">Link to contact/:id page</Link> */}



        {/* If the current URL is /tech, this route is rendered while the rest are ignored */}
        <Route path="/tech">
           <div className="title text-green-600"> {/*text-green-600 is Tailwind formatting*/}
              This is the Coding Technology Topics page
           </div>
           <LinkHome/>
          {/* Let's make this it's own component, in its own file. e.g. <Tech /> */}
        </Route>


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


        {/* If none of the previous routes render anything, this route acts as a fallback. A route with path="/" 
        will *always* match the URL because all URLs begin with a /. So that's why we put this one last of all */}
        <Route path="/">
          <div className="title text-yellow-600 ">
            This is the placeholder for the Welcome page
          </div>
          <div className="subtitle">

            <Link to="/tech">Coding Technology Topics</Link>
            <br/>

            <Link to="/process">Coding Process Topics</Link>
            <br/>

            <Link to="/people">Coding People Topics</Link>
            <br/>

          </div>
          {/* Let's make this it's own component, in its own file. e.g. <Welcome /> */}
        </Route>

      </Switch>
    </div>
  );
}

export default App;
