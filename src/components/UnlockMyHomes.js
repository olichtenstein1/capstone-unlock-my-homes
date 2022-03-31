import React from "react"
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import { Link, Redirect, Route } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./UnlockMyHomes.css"

export const UnlockMyHomes = () => {
    return (
        <>
           <Route
      render={() => {
        if (localStorage.getItem("user_agent")) {
          return (
            <>
            
            <div className="topSection">
            <h1 className="title">Unlock My Homes</h1>
            <Link className="title" to="/">Home</Link>
           
             
              
              
              
              <ApplicationViews />
              
              </div>
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
