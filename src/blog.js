import React, { useEffect } from 'react'
import { useState } from 'react'
import Tinymce from "./tinymce"
import axios from 'axios';

export default function Blog(props) {

    const [blogs, setblogs] = useState([])

    useEffect(() => {

        axios.get("https://studiobodhi9555ankit.herokuapp.com/blog-data/1")
            .then((res) => {
                setblogs(res.data)
            })


    }, [])


    function valuesetter(val) {
        props.setquestion((prevvalue) => {
            return {
                ...prevvalue,
                content: val
            }

        })
    }

    function Delete(event, id) {
        console.log(id)
        axios.delete(`https://studiobodhi9555ankit.herokuapp.com/blog-data/${id}`)
            .then((res) => {
                console.log(res)
            })
    }

    function Blogcreator() {
        return (
            <div>
                <h1>Blogs</h1>
                {blogs.map((blog) => {
                    return (
                        <div>
                            <h3>{blog[1]}</h3>
                            <button onClick={(event) => Delete(event, blog[0])} >Delete</button>
                        </div>
                    )

                })}
            </div>
        )
    }


    return (
        <div style={{ margin: "10%", marginBottom: "2%" }}>
            {Blogcreator()}
            <textarea placeholder="Add title" onChange={(event) => props.settitle(event.target.value)} style={{ width: "90%" }} />
            <Tinymce
                width="90%"

                minheight={800}
                set={valuesetter}
            />


        </div>
    )
}
