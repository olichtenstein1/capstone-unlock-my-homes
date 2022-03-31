import React from "react"
import { Route } from "react-router-dom"
import { RequestForm } from "./requests/RequestForm"
import { RequestList } from "./requests/RequestList"
import { PropertyForm } from "./properties/PropertyForm"
import { Request } from "./requests/Request"
import { RequestOffers } from "./requests/RequestOffers"
import { Offer } from "./requests/Offer"
import { AppointmentList } from "./appointments/AppointmentList"
import { Appointment } from "./appointments/Appointment"
import { CompletedAppointments } from "./appointments/CompletedAppointments"
import { ClientForm } from "./clients/ClientForm"
import { HomePage } from "./homepage/HomePage"

// component for setting up the individual routes and which component
// will be displayed when a browser route is changed in the url


//Main goal of ApplicationViews is to determine what view of the application 
//should be rendered based of the browser url
export const ApplicationViews = () => {

    // when the browser url matches the path the routed component will be rendered
    return (
        <>

            <Route exact path="/">
                < HomePage />
            </Route>


            <Route exact path="/clientForm">
                < ClientForm />
            </Route>

            <Route exact path="/propertyForm">
                < PropertyForm />
            </Route>

            <Route exact path="/requestList">
                < RequestList />
            </Route>

            <Route exact path="/requestList/:listingRequestId(\d+)">
                < Request />
            </Route>

            <Route exact path="/requestForm">
                < RequestForm />
            </Route>

            <Route exact path="/requestOffers">
                < RequestOffers />
            </Route>

            <Route exact path="/requestOffers/:offerId(\d+)">
                < Offer />
            </Route>

            <Route exact path="/appointmentList">
                < AppointmentList />
            </Route>

            <Route exact path="/appointmentList/:appointmentId(\d+)">
                < Appointment />
            </Route>

            <Route exact path="/completedAppointments">
                < CompletedAppointments />
            </Route>



        </>
    )
}