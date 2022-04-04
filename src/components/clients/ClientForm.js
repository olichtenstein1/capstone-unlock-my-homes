import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./ClientForm.css"


// form for the LISTING AGENT to add a property
export const ClientForm = () => {

    const [client, updateClient] = useState({

        name: "",
        phoneNumber: "",
        email: "",
        userId: 2,
        
    })

    const history = useHistory()
    
    const submitClient = () => {

        const newClient = {
            name: client.name,
            phoneNumber: client.phoneNumber,
            email: client.email,
            // use get local storage
            userId: parseInt(localStorage.getItem("user_agent"))
        }

        // send data to the api
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newClient)
        }
        // return data to clients 
        return fetch("http://localhost:8088/clients", fetchOption)
            .then(() => {
                history.push("/requestForm")
            })
        }

    return (
        <form className="clientForm">
            <h2 className="clientForm__title">Add a Client</h2>

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...client}
                                    //modifying copy by changing values to what was inputted
                                    copy.name = evt.target.value
                                    // take that copy and make that the new state
                                    updateClient(copy)
                                }
                            }
                            // ?
                            required autoFocus
                            type="select"
                            className="form-control"
                            placeholder="Full Name"
                            
                             />
                    </div>
                </fieldset>

          

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...client}
                                    //modifying copy by changing values to what was inputted
                                    copy.phoneNumber = evt.target.value
                                    // take that copy and make that the new state
                                    updateClient(copy)
                                }
                            }
                            
                            required autoFocus
                            type="select"
                            className="form-control"
                            placeholder="phone number"
                            
                             />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...client}
                                    //modifying copy by changing values to what was inputted
                                    copy.email = evt.target.value
                                    // take that copy and make that the new state
                                    updateClient(copy)
                                }
                            }
                            
                            required autoFocus
                            type="select"
                            className="form-control"
                            placeholder="email"
                            
                             />
                    </div>
                </fieldset>

                <div>
                <button onClick={evt => {
                    evt.preventDefault()
                    submitClient()}} className="btn btn-primary" >
                    Add Client
                </button>
                </div>




            
            
            
            </form>
    )



}