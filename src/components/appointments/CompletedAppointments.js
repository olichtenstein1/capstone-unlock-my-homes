import React, { useState, useEffect } from "react"
import "./CompletedAppointments.css"

export const CompletedAppointments = () => {
    // fetch updatedrequests that are filtered only if accepted by query parameter

    const [appointment, setAppointments] = useState([])


    useEffect(
        () => {
            fetch("http://localhost:8088/listingRequests?_expand=user&_expand=client&_expand=property&isAccepted=true&isConfirmed=true&completed=true")
                .then(res => res.json())
                .then((data) => {
                    setAppointments(data)
                })
        },
        []
    )

   


    return (

        <>
        <h1>Completed Appointments</h1>
            {
                appointment.map(
                    (app) => {
                        return <p key={`appointment--${app.id}`}>
                            <div> <h2> Completed Appointments </h2>
                                <div> Address :{app.property.homeAddress}
                                </div>
                                <div> Date/Time : {app.showingDateTime}
                                </div>
                            </div>
                            <div> <h4> Client Info</h4>
                                <div> Name: {app.client.name}
                                </div>
                                <div>Email: {app.client.email}
                                </div>
                                <div>Phone Number: {app.client.phoneNumber}
                                </div>

                            </div>
                            
                        </p>




                    }
                )
            }
        </>
    )


}