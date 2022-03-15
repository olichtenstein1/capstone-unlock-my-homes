import React from "react"
import { Route } from "react-router-dom"
import { RequestForm } from "./requests/RequestForm"
import { RequestList } from "./requests/RequestList"
import { PropertyForm } from "./properties/PropertyForm"

// component for setting up the individual routes and which component
// will be displayed when a browser route is changed in the url


//Main goal of ApplicationViews is to determine what view of the application 
//should be rendered based of the browser url
export const ApplicationViews = () => {

    // when the browser url matches the path the routed component will be rendered
    return (
        <>

            <Route exact path="/propertyForm">
                < PropertyForm />
            </Route>

            <Route exact path="/requestList">
                < RequestList />
            </Route>

            <Route exact path="/requestForm">
                < RequestForm />
            </Route>

        </>
    )
}