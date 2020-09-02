import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import MakePost from "./components/pages/MakePost";
import UserProfile from "./components/pages/UserProfile";
import { reducer, initialState } from "./reducers/userReducer";

/**
 * Crea el contexto de usuario para manejarlo en distintas vistas
 * Create the user contex to handle it in different views
 */
export const UserContext = createContext();

/**
 * Administra las rutas
 * Manage the Routes
 */
const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    //convert string to object
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
    console.log(typeof user);
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/makepost">
        <MakePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
    </Switch>
  );
};

/**
 * Permite manejar las rutas y el data
 * Allows to handle routes and data
 */
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
