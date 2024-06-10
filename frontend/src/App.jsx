
import "./App.css";
import { AdminSignUpPage } from "./component/Login";
import { UserSignUpPage } from "./component/Login";
import { UserSignIn } from "./component/Login";
import { AdminSignIn } from "./component/Login";
import { UsersHome } from "./component/User";
import { AdminHome } from "./component/Admin";
import { UserCreatCard } from "./component/User";


import { Homefn } from "./component/Homefn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  return (
   <Router> 
    <Routes>
      <Route path="/" element={<Homefn/>} />
      <Route path="/user-signup" element={<UserSignUpPage/>} />
      <Route path="/admin-signup"  element={<AdminSignUpPage/>} />
      <Route path="/user-signin" element= {<UserSignIn/>} />
      <Route path="/admin-signin" element= {<AdminSignIn/>} />
      <Route path="/user-home" element= {<UsersHome/>} />
      <Route path="/admin-home" element= {<AdminHome/>} />
      <Route path="/user-signup/user-card" element= {<UserCreatCard/>} />
      <Route path="/user-signin/user-card" element= {<UserCreatCard/>} />
      <Route path="/admin-signup/admin-card" element= {<UserCreatCard/>} />
      <Route path="/admin-signin/admin-card" element= {<UserCreatCard/>} />



    </Routes>
   </Router>
  )
}

export default App
