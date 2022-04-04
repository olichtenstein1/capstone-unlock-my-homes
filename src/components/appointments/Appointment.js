



import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Appointment.css"

export const Appointment = () => {
    const [appointment, assignAppointment] = useState({})
    const { appointmentId } = useParams()

    useEffect(
        () => {
            return fetch(`http://localhost:8088/listingRequests/${appointmentId}?_expand=property&_expand=user&_expand=client`)
                .then(response => response.json())
                .then((data => {
                    assignAppointment(data)
                }))
        },
        [appointmentId]
    )

    const updateRequest = () => {
        fetch(`http://localhost:8088/listingRequests/${appointmentId}?_expand=property&_expand=user&_expand=client`)
        .then(res => res.json())
                .then((data) => {
                    assignAppointment(data)
    }
                )}

    const history = useHistory()

    const completeAppointment = () => {
        // copy existing request 
        const completedAppointment = {
            showingDateTime: appointment.showingDateTime,
            amountOffered: parseInt(appointment.amountOffered),
            completed: true,
            propertyId: parseInt(appointment.propertyId),
            clientId: parseInt(appointment.clientId),
            // userId will be getLocalStorage
            userId: parseInt(localStorage.getItem("user_agent")),
            isAccepted: true,
            isConfirmed: true
        }
        //step 2 update isConfirmed property to true

        //step 3 perform put operation and send the new copy as the body
        fetch(`http://localhost:8088/listingRequests/${appointmentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completedAppointment)
        })
            .then(() => {
                history.push("/")
            })
            .then(() => {updateRequest()
            })
    }


    return (
        <>
            <h2> Showing Details </h2>
            <section className="appointmentDetails">
                <h4 className="offer__homeAddress"> Address: {appointment.property?.homeAddress} </h4>

                <h4 className="offer__showingDateTime"> Showing Time - {appointment.showingDateTime}</h4>

                <div className="offer__clientInfo"><h3> Client Info -</h3>
                <div>
                    <h4> Name:  {appointment.client?.name}
                    </h4>
                    <div>Email:   {appointment.client?.email}
                    </div>
                    <div>Phone Number:  {appointment.client?.phoneNumber}
                    </div>
                    </div>
                </div>

            </section>

            <button onClick={evt => {
                evt.preventDefault()
                completeAppointment()
            }} className="btn btn-primary" >
                Complete
            </button>
        </>
    )

}