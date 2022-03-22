import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./RequestList.css"

export const RequestList = () => {

    const [listingRequests, setListingRequest] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/listingRequests?_expand=user&_expand=property")
                .then(res => res.json())
                .then((data) => {
                    setListingRequest(data)
                })
        },
        []
    )

    const deleteRequest = (id) => {
        fetch(`http://localhost:8088/listingRequests/${id}`, {
            method: "DELETE"
        })
    }


// const isListingAgent = localStorage.getItem("user_agent")
// ? JSON.parse(localStorage.getItem("user_agent"))
// : false;

    // WILL SHOW EACH REQUEST SUBMITTED BY THE LISTING AGENT FOR THE BUYERS AGENT TO HAVE THE ABILITY TO ACCEPT
    return (
        <>
            <h1> Request List </h1>
            {

                listingRequests.map(
                    (listingRequest) => {
                        return <p key={`listingRequest--${listingRequest.id}`}>
                            <div>Home Address : <Link to={`/requestList/${listingRequest.id}`}>{listingRequest.property.homeAddress}</Link>
                            </div>

                            <div>Listing Agent: {listingRequest.user.name}
                            </div>

                            <div>Showing Time : {listingRequest.showingDateTime}
                            </div>

                            <div>Amount Offered : ${listingRequest.amountOffered}
                            </div>

                            <button onClick={() => {
                                deleteRequest(listingRequest.id)
                            }}>Delete</button>



                        </p>
                    }
                )
            }
        </>
    )
}



