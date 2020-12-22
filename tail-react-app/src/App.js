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

        {/* If the current URL is /about, this route is rendered while the rest are ignored */}
        <Route path="/about">
           <div className="title text-green-600"> {/*text-green-600 is Tailwind formatting*/}
              This is the About page
           </div>
           <LinkHome/>
          {/* <About /> */}
        </Route>

        {/* Note how these two routes are ordered. The more specific path="/contact/:id" comes before path="/contact" so that route will render when viewing an individual contact */}
        <Route path="/contact/:id">
          <div className="title text-blue-600">
            This is the Contact (URL = /contact/:id) page
          </div>
          <LinkHome/>
          {/* <Contact /> */}
        </Route>

        <Route path="/contact">
          <div className="title text-red-600">
            This is the Contacts page (URL = /contact, without the :id part)
          </div>
          <LinkHome/>
          {/* <AllContacts /> */}
        </Route>

        {/* If none of the previous routes render anything, this route acts as a fallback.
            A route with path="/" will *always* match the URL because all URLs begin with a /.
            So that's why we put this one last of all */}
        <Route path="/">
          <div className="title text-yellow-600 ">
            This is the Home page
          </div>
          <div className="subtitle">
            <Link to="/about">Link to About page</Link>
            <br/>
            <Link to="/contact">Link to contact page</Link>
            <br/>
            <Link to="/contact/:id">Link to contact/:id page</Link>
          </div>

          {/* <Home /> */}
        </Route>

      </Switch>
    </div>
  );
}

export default App;
