import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import "./AppointmentList.css"

export const AppointmentList = () => {
    // fetch updatedrequests that are filtered only if accepted by query parameter

    const [appointment, setAppointments] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/listingRequests?_expand=user&_expand=client&_expand=property&isAccepted=true&isConfirmed=true")
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
                        return <p className="appointment" key={`appointment--${app.id}`}>
                            <div className="appointmentInfo">
                            <div> <h2> My Appointments </h2>
                                <div> Address : <Link to={`/appointmentList/${app.id}`}>{app.property.homeAddress}</Link>
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
                            </div>
                            
                        </p>




                    }
                )
            }
            <div>
                            <button onClick={() => history.push("/completedAppointments")}>View Completed Appointments</button>
                            </div>
        </>
    )


}