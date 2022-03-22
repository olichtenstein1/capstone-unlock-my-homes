



import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const Appointment = () => {
const [appointment, assignAppointment] = useState({})
const { appointmentId } = useParams()

useEffect(
    () => {
        return fetch(`http://localhost:8088/listingRequests/${appointmentId}?_expand=property&_expand=user`)
            .then(response => response.json())
            .then((data => {
                assignAppointment(data)
            }))
    },
    [appointmentId]
)

const history = useHistory()

    const completeAppointment = () => {
        // copy existing request 
        const completedAppointment = {
            showingDateTime: appointment.showingDateTime,
            amountOffered: parseInt(appointment.amountOffered),
            completed: true,
            propertyId: parseInt(appointment.propertyId),
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
    }


return (
    <>
        <h2> Showing Details </h2>
        <section className="offer">
        <h3 className="offer__homeAddress"> Address: {appointment.property?.homeAddress} </h3>
        <h4 className="offer__user">Buyers Agent -</h4>
        <h4 className="offer__showingDateTime">Showing Time - </h4>
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