import React from "react"
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import { Redirect, Route } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const UnlockMyHomes = () => {
    return (
        <>
           <Route
      render={() => {
        if (localStorage.getItem("user_agent")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
        </>
    )
}
