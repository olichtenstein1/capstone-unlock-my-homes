import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./PropertyForm.css"


// form for the LISTING AGENT to add a property
export const PropertyForm = () => {

    const [property, updateProperty] = useState({

        homeAddress: "",
        city: "",
        state: "",
        zipcode: "",
        userId: 2,
        
    })

    const history = useHistory()
    
    const submitProperty = () => {

        const newProperty = {
            homeAddress: property.homeAddress,
            city: property.city,
            state: property.state,
            zipcode:property.zipcode,
            // use get local storage
            userId: parseInt(localStorage.getItem("user_agent"))
        }

        // send data to the api
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProperty)
        }
        // return data to properties 
        return fetch("http://localhost:8088/properties", fetchOption)
            .then(() => {
                history.push("/")
            })
        }

    return (
        <form className="propertyForm">
            <h2 className="propertyForm__title">Add a Property</h2>

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="homeAddress">Address:</label>
                        <input
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...property}
                                    //modifying copy by changing values to what was inputted
                                    copy.homeAddress = evt.target.value
                                    // take that copy and make that the new state
                                    updateProperty(copy)
                                }
                            }
                            // ?
                            required autoFocus
                            type="select"
                            className="form-control"
                            placeholder="Street Address"
                            
                             />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...property}
                                    //modifying copy by changing values to what was inputted
                                    copy.city = evt.target.value
                                    // take that copy and make that the new state
                                    updateProperty(copy)
                                }
                            }
                            
                            required autoFocus
                            type="select"
                            className="form-control"
                            placeholder="city"
                            
                             />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...property}
                                    //modifying copy by changing values to what was inputted
                                    copy.state = evt.target.value
                                    // take that copy and make that the new state
                                    updateProperty(copy)
                                }
                            }
                            
                            required autoFocus
                            type="select"
                            className="form-control"
                            placeholder="state"
                            
                             />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="zipcode">Zipcode:</label>
                        <input
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...property}
                                    //modifying copy by changing values to what was inputted
                                    copy.zipcode = evt.target.value
                                    // take that copy and make that the new state
                                    updateProperty(copy)
                                }
                            }
                            
                            required autoFocus
                            type="select"
                            className="form-control"
                            placeholder="zipcode"
                            
                             />
                    </div>
                </fieldset>

                <div>
                <button onClick={evt => {
                    evt.preventDefault()
                    submitProperty()}} className="btn btn-primary" >
                    Add Property
                </button>
                </div>




            
            
            
            </form>
    )
}