import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import NavDrawer from '../Nav/NavDrawer'
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import HostProfilePage from "../HostProfilePage/HostProfilePage";
import AddEventForm from "../AddEventForm/AddEventForm";
import EventDetails from "../EventDetails/EventDetails";
import Dashboard from "../Dashboard/Dashboard";
import LoginPage from "../LoginPage/LoginPage";
import ProfileForm from "../ProfileForm/ProfileForm";
import RegisterPage from "../RegisterPage/RegisterPage";
import WelcomePage from "../WelcomePage/WelcomePage";
import ManageTagsForm from "../ManageTagsForm/ManageTagsForm";
import MultiSelect from "../ReuseableComponents/MultiSelect";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
    // dispatch({ type: "FETCH_VENDOR_BOOTHS" });
    // dispatch({ type: "FETCH_TAGS" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <NavDrawer />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          {/* <Redirect exact from="/" to="/home" /> */}

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route exact path="/addEventForm">
            <AddEventForm />
          </Route>

          <Route exact path="/profileForm">
            <ProfileForm />
          </Route>

          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/profile"
          >
            <HostProfilePage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/"
          >
            <UserPage />
          </ProtectedRoute> */}

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/boothdetails"
          >
            <EventDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/manageTags"
          >
            <ManageTagsForm />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              <Redirect to="/" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              <Redirect to="/" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route path="/event/:eventId">
            <EventDetails />
          </Route>

          <Route path="/" exact>
            {user.id ? <Dashboard /> : <WelcomePage />}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
