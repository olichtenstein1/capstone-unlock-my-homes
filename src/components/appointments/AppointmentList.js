import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import "./AppointmentList.css"

export const AppointmentList = () => {
    // fetch updatedrequests that are filtered only if accepted by query parameter

    const [appointment, setAppointments] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/listingRequests?_expand=user&_expand=property&isAccepted=true&isConfirmed=true")
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
                            <div> <h2> My Appointments </h2>
                                <div> Address : <Link to={`/appointmentList/${app.id}`}>{app.property.homeAddress}</Link>
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

                            </div><div>
                            <button onClick={() => history.push("/completedAppointments")}>View Completed Appointments</button>
                            </div>
                        </p>




                    }
                )
            }
        </>
    )


}