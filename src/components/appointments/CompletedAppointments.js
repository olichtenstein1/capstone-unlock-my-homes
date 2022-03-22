import React, { useState, useEffect } from "react"
import "./CompletedAppointments.css"

export const CompletedAppointments = () => {
    // fetch updatedrequests that are filtered only if accepted by query parameter

    const [appointment, setAppointments] = useState([])


    useEffect(
        () => {
            fetch("http://localhost:8088/listingRequests?_expand=user&_expand=property&isAccepted=true&isConfirmed=true&completed=true")
                .then(res => res.json())
                .then((data) => {
                    setAppointments(data)
                })
        },
        []
    )

   


    return (

        <>
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
                                <div> Name:
                                </div>
                                <div>Email:
                                </div>
                                <div>Phone Number:
                                </div>

                            </div>
                            
                        </p>




                    }
                )
            }
        </>
    )


}