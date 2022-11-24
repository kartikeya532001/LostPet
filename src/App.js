import "./Assets/CSS/App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./login";
import Signup from "./signup";
import Pet from "./Petregistration"
import Footer from "./Footer";
import ScrollToTop from './ScrollToTop';
import Petd from "./Petdetails";
import UserD from "./Userprofile";


function App() {
  return (
    <>
    
    <ScrollToTop />
   <UserD />
      <Switch>
      {/* <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} /> 
      <Route exact path="/signup" component={Signup} /> 
      */}
      </Switch>
    <Footer />
    </>
 
  );
}

export default App;