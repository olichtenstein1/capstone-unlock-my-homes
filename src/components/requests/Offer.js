import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Offer.css"

export const Offer = () => {
const [offer, assignOffer] = useState({})
const { offerId } = useParams()
const conflictDialog = useRef()
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
            clientId: parseInt(offer.clientId),
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
                conflictDialog.current.showModal()
            })
    }


return (
    <>
        <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Offer Accepted! 
                </div>
                <button className="button--close" onClick={() => {history.push("/")}
}>Close</button>
            </dialog>
        <h2> Showing Details </h2>
        <section className="offerDetails">
        <h3 className="offer__homeAddress"> Address: {offer.property?.homeAddress} </h3>
        <div>
        <h4 className="offer__user">Buyers Agent - {offer.user?.name}</h4>
        <ul className="offer__userInfo"> {offer.user?.email} </ul>
        <ul className="offer__userInfo"> {offer.user?.phoneNumber} </ul>
        </div>
        <h4 className="offer__showingDateTime">Showing Time : {offer.showingDateTime}</h4>
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