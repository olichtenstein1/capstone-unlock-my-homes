import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const Request = () => {
    
    const [request, assignRequest] = useState({})
    const { listingRequestId } = useParams()
    
    useEffect(
        () => {
            return fetch(`http://localhost:8088/listingRequests/${listingRequestId}?_expand=property&_expand=user`)
            .then(response => response.json())
            .then((data => {
                assignRequest(data)
            }))
        },
        [ listingRequestId ]
    )

    const history = useHistory()

    const acceptRequest = () => {
        // copy existing request 
        const acceptedRequest = {
            showingDateTime: request.showingDateTime,
            amountOffered: parseInt(request.amountOffered),
            completed: false,
            propertyId: parseInt(request.propertyId),
            // userId will be getLocalStorage
            userId: parseInt(localStorage.getItem("user_agent")),
            isAccepted: true,
            isConfirmed: false
        }
        //step 2 update isAccepted property to true

        //step 3 perform put operation and send the new copy as the body
        fetch(`http://localhost:8088/listingRequests/${listingRequestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(acceptedRequest)
        })
            .then(() => {
                history.push("/")
            })
    }

    return (
        <>
        <h2> Request Details </h2>
        <section className="request">
        <h3 className="request__homeAddress">{ request.property?.homeAddress }</h3>
        <div className="request__city"> {request.property?.city} </div>
        <div className="request__state"> {request.property?.state} </div> 
        <div className="request__zipcode"> {request.property?.zipcode} </div>
        <h4 className="request__user">Listing Agent - { request.user?.name} </h4>
        <h4 className="request__showingDateTime">Showing Time - { request.showingDateTime} </h4>
        <h4 className="request__amountOffered">Amount Offered - ${ request.amountOffered} </h4>
        </section>

        <button onClick={evt => {
                    evt.preventDefault()
                    acceptRequest()
                    }} className="btn btn-primary" >
                    Accept
                </button>
        </>
    )
}