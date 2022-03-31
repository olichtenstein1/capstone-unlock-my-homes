import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

// NavBar creation
// unordered list with list items within, Link component within the list item for generating anchor tags
// Link - the to= is the href attribute of the anchor tag created
export const NavBar = (props) => {
    return (
        <ul className="navbar">

            <li className="navbar__item">
                <Link className="navbar__link" to="/requestForm">Create a Request</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/requestList">Request List</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/requestOffers">Request Offers</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/appointmentList">My Appointments</Link>
            </li>
            <div className="logout">
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("user_agent")
                        }
                    }>
                    Logout
                </Link>
            </li>
            </div>


        </ul>
    )
}