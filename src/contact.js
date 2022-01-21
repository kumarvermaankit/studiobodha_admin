import React, { useEffect, useState } from 'react'

import axios from 'axios';


export default function Contact() {

    const [contact, setcontacts] = useState([])

    useEffect(() => {

        axios.get("https://studiobodhi9555ankit.herokuapp.com/contact-save/1")
            .then((res) => {
                setcontacts(res.data)
            })


    }, [])


    function Delete(event, id) {
        axios.delete(`https://studiobodhi9555ankit.herokuapp.com/contact-save/${id}`)
    }




    return (
        <div style={{ backgroundColor: "#ccc" }}>
            {contact.map((each) => {
                return (
                    <div>
                        <div style={{ display: "flex" }}>
                            <label>Name</label>
                            <p>{each.name}</p>

                        </div>
                        <div style={{ display: "flex" }}>
                            <label>Email</label>
                            <p>{each.email}</p>

                        </div>
                        <div style={{ display: "flex" }}>
                            <label>Phone Number</label>
                            <p>{each.phonenumber}</p>

                        </div>

                        <div style={{ display: "flex" }}>
                            <label>Message</label>
                            <p>{each.message}</p>

                        </div>

                        <button onClick={(event) => Delete(event, each.id)}>delete</button>
                    </div>
                )
            })}
        </div>
    )
}
