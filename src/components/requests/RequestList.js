import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./RequestList.css"

export const RequestList = () => {

    const [listingRequests, setListingRequest] = useState([])
    const history = useHistory()
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

    const updateRequest = () => {
        fetch("http://localhost:8088/listingRequests?_expand=user&_expand=property")
        .then(res => res.json())
                .then((data) => {
                    setListingRequest(data)
    }
                )}
// after delete
    const deleteRequest = (id) => {
        fetch(`http://localhost:8088/listingRequests/${id}`, {
            method: "DELETE"
            })
            .then(() => {updateRequest()
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
                        // if (listingRequest.userId === parseInt(localStorage.getItem("user_agent"))){

                        return <p className="request" key={`listingRequest--${listingRequest.id}`}>
                            <div className="requestInfo">
                            <ul>Home Address : <Link to={`/requestList/${listingRequest.id}`}>{listingRequest.property.homeAddress}</Link>
                            </ul>

                            <ul>Listing Agent: {listingRequest.user.name}
                            </ul>

                            <ul>Showing Time : {listingRequest.showingDateTime}
                            </ul>

                            <ul>Amount Offered : ${listingRequest.amountOffered}
                            </ul>

                            </div>
                            <div className="requestEnd">

                        
                            <img className="requestHome"
      src= "data:image/png;base64,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"
      alt="new"
      />
</div>
                            {listingRequest.userId === parseInt(localStorage.getItem("user_agent"))

                             ? <button onClick={() => {
                                deleteRequest(listingRequest.id)
                            }}>Delete</button> : null}




                        </p>
                       
                    }
                )
                    }
        </>
        
    )
}



