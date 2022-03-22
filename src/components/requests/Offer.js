import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const Offer = () => {
const [offer, assignOffer] = useState({})
const { offerId } = useParams()

useEffect(
    () => {
        return fetch(`http://localhost:8088/listingRequests/${offerId}?_expand=property&_expand=user`)
            .then(response => response.json())
            .then((data => {
                assignOffer(data)
            }))
    },
    [offerId]
)

const history = useHistory()

    const confirmOffer = () => {
        // copy existing request 
        const confirmedRequest = {
            showingDateTime: offer.showingDateTime,
            amountOffered: parseInt(offer.amountOffered),
            completed: false,
            propertyId: parseInt(offer.propertyId),
            // userId will be getLocalStorage
            userId: parseInt(localStorage.getItem("user_agent")),
            isAccepted: true,
            isConfirmed: true
        }
        //step 2 update isConfirmed property to true

        //step 3 perform put operation and send the new copy as the body
        fetch(`http://localhost:8088/listingRequests/${offerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(confirmedRequest)
        })
            .then(() => {
                history.push("/")
            })
    }


return (
    <>
        <h2> Showing Details </h2>
        <section className="offer">
        <h3 className="offer__homeAddress"> Address: {offer.property?.homeAddress} </h3>
        <h4 className="offer__user">Buyers Agent -</h4>
        <h4 className="offer__showingDateTime">Showing Time - </h4>
        </section>

        <button onClick={evt => {
                    evt.preventDefault()
                    confirmOffer()
                    }} className="btn btn-primary" >
                    Confirm
                </button>
    </>
)   

}