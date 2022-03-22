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
        {
                listingOffers.map(
                    (listingOffer) => {
                        return <p key={`listingOffer--${listingOffer.id}`}>
                        <div> <h3> Showing Details</h3>
                        <div> Address : <Link to={`/requestOffers/${listingOffer.id}`}>{listingOffer.property.homeAddress}</Link>
                        </div>
                        <div> Date/Time : {listingOffer.showingDateTime}
                        </div>
                        </div>
                        <div> <h3> Buyers Agent Info</h3>
                        <div>Name: {listingOffer.user.name}
                        </div>
                        <div>Email: {listingOffer.user.email}
                        </div>

                        </div>
                       

                        
                        
                        

                        

                        </p>
                    }
                )
            }
        </>
    )
}