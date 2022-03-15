import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./RequestForm.css"

export const RequestForm = () => {

    const [form, updateForm] = useState({

        showingDateTime: "",
        amountOffered: "",
        completed: false,
        propertyId: 1,
        //userId will be localStorage
        userId: 2,
        //isAccepted
        isAccepted: false,
        isConfirmed: false
    })





    const [properties, setProperty] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/properties")
                .then(res => res.json())
                .then((data) => {
                    setProperty(data)
                })
        },
        []
    )


    const history = useHistory()
    // function designed for submitting requests
    const submitRequest = () => {

        const newRequest = {
        showingDateTime: form.showingDateTime,
        amountOffered: form.amountOffered,
        completed: false,
        propertyId: form.propertyId,
        // userId will be getLocalStorage
        userId: 2,
        isAccepted: false,
        isConfirmed: false
        }

        // send data to the api
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRequest)
        }
        // return data
        return fetch("http://localhost:8088/requests", fetchOption)
            .then(() => {
                history.push("/requestList")
            })
        }


    return (
        <form className="requestForm">
                <h2 className="requestForm__title">Create A Request</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="property">Property:</label>
                        <select
                        //change event for description state of employee
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...form}
                                    //modifying copy by changing values to what was inputted
                                    copy.propertyId = evt.target.value
                                    // take that copy and make that the new state
                                    updateForm(copy)
                                }
                            }
                           
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="properties"
                            
                            >

                             <option value="0" key={'property--'}>Choose a Property </option>
                            {
                                properties.map(
                                    (objectProperty) => {
                                        return <option value={objectProperty.id} keys={`property--${objectProperty.id}`}>
                                            {objectProperty.homeAddress}
                                        </option>
                                    }
                                )
                            }
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date">DateTime:</label>
                        <input type = "datetime-local"
                        //change event for description state of ticket 
                            onChange={
                                (evt) => {
                                    //creating a copy of the existing state
                                    const copy = {...form}
                                    //modifying copy by changing values to what was inputted
                                    copy.showingDateTime = evt.target.value
                                    // take that copy and make that the new state
                                    updateForm(copy)
                                }
                            }
                            // ?
                            required autoFocus
                            
                            className="form-control"
                            
                             />
                    </div>
                </fieldset>

                <fieldset>
                <div className="form-group">
                    <label htmlFor="amountOffered">Amount Offered:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...form}
                                copy.amountOffered = evt.target.value
                                updateForm(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="amount"
                         />
                </div>
            </fieldset>

            
            <div>
                <button onClick={evt => {
                    evt.preventDefault()
                    submitRequest()}} className="btn btn-primary" >
                    Submit Request
                </button>
                </div>

           
                </form>
        
    )
}