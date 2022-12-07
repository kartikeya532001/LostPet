import "./Assets/CSS/App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./login";
import Signup from "./signup";
import PetRegistration from "./petregistration"
import Footer from "./Footer";
import ScrollToTop from './ScrollToTop';
import PetDetails from "./Petdetails";
import UserDetails from "./Userprofile";
import UserHome from "./UserHome";
import DisplayPets from "./DisplayPets";
import DisplayPetsN from "./DisplayPetsN";
import EditPet from "./EditPetDetails";
import EditUser from "./EditUserDetails";
import Request from "./Request";


function App() {
  return (
    <>
    <ScrollToTop /> 
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/signup" component={Signup} /> 
        <Route exact path="/petdetails/:p_id" component={PetDetails} /> 
        <Route exact path="/userprofile" component={UserDetails} />
        <Route exact path="/petregistration" component={PetRegistration} /> 
        <Route exact path="/userhome" component={UserHome} />
        <Route exact path="/displaypets" component={DisplayPets} /> 
        <Route exact path="/displaypetsn" component={DisplayPetsN} /> 
        <Route exact path="/editpetdetails" component={EditPet} /> 
        <Route exact path="/edituserdetails" component={EditUser} /> 
        <Route exact path="/requests" component={Request} /> 
      </Switch>
    <Footer />
    </>
 
  );
}

export default App;