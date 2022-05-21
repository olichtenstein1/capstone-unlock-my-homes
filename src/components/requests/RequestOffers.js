import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./RequestOffers.css"

export const RequestOffers = () => {
// fetch updatedrequests that are filtered only if accepted by query parameter

const [listingOffers, setListingOffer] = useState([])


useEffect(
    () => {
        fetch("http://localhost:8088/listingRequests?_expand=user&_expand=property&isAccepted=true")
            .then(res => res.json())
            .then((data) => {
                setListingOffer(data)
            })
    },
    []
)


    return (

        
        <>
        <h1> Request Offers </h1>
        {
                listingOffers.map(
                    (listingOffer) => {
                        return <p className="requestOffer" key={`listingOffer--${listingOffer.id}`}>
                        <div> <h3> Showing Details</h3>
                        <div className="requestOfferInfo">
                        <ul> Address : <Link to={`/requestOffers/${listingOffer.id}`}>{listingOffer.property.homeAddress}</Link>
                        </ul>
                        <ul> Date/Time : {listingOffer.showingDateTime}
                        </ul>
                        </div>
                        <div> <h3> Buyers Agent Info</h3>
                        <ul>Name: {listingOffer.user.name}
                        </ul>
                        <ul>Email: {listingOffer.user.email}
                        </ul>

                        <ul>Phone Number: {listingOffer.user.phoneNumber}
                        </ul>

                        </div>
                        </div>
                       

                        
                        
                        

                        

                        </p>
                    }
                )
            }
        </>
    )
}