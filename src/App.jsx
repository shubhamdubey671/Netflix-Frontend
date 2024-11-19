import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen.jsx";
import ProfileScreen from "./components/ProfileScreen.jsx";
import PaymentFail from "./components/PaymentFail.jsx";
import Success from "./components/Success.jsx";
import Loader from "./components/Loader.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import { auth } from "./firebase.js";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice.js";
import NotFound from "./components/NotFound.jsx";
import AlreadyUser from "./utils/AlreadyUser.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();



  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // console.log(userAuth);
        dispatch(login({
            uid: userAuth.uid,
            email: userAuth.email,
            name : userAuth.displayName,
            photo: userAuth.photoURL,
            emailVerified :userAuth.emailVerified,

        }))
      }
      else{
        dispatch(logout())
      }
    });

    setTimeout(() => {
      setLoading(false);
    }, 4100);

    return unsubscribe;
  }, [dispatch]);
  // console.log(user,"app")
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>

          <Route element={<AlreadyUser user={user}  />}>
                   <Route exact path="/" element={<LoginScreen />} /> 
              </Route>
              <Route element={<ProtectedRoute user={user}/>}>

              
            <Route path="/home" element={<div className="App"><HomeScreen /></div>} />
          <Route exact path="/profile" element={<ProfileScreen />} /> 
          <Route exact path="/success" element={<Success />} /> 
          <Route exact path="/failedPayment" element={<PaymentFail />} /> 
          </Route>
          </Routes>
           
        </Router>
      )}
    </>
  );
}

export default App;
