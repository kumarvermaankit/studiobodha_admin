
import { useState } from 'react';
import storage from "./fire_base"
import React, { useEffect } from 'react'
import './App.css';
import axios from 'axios';
import Blog from "./blog"
function App() {


  const [file, setfile] = useState(null);
  const [content, setcontent] = useState(null);
  const [title, settitle] = useState(null);
  const [img, setimg] = useState(null)

  const [images, setimages] = useState(null);
  const [rp, setrp] = useState(0);
  function change(event) {

    // console.log(event.target.files[0])

    setfile(event.target.files[0])

  }

  console.log(content)
  console.log(title)


  useEffect(() => {
    axios.get("https://studiobodhi9555ankit.herokuapp.com/photo-url/1")
      .then((res) => {
        console.log(res)
        setimages(res.data)
      })
  }, [rp])

  function uploadImage() {
    const uploadtask = storage.storage().ref(`images/${file.name}`).put(file)
    uploadtask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage.storage()
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(imgurl => {

            console.log(imgurl)
            axios.post("https://studiobodhi9555ankit.herokuapp.com/photo-url/1", { picurl: imgurl })
              .then((res) => {
                console.log(res)
                setrp(rp + 1)
              })


          })

      })
  }


  console.log(img)

  function uploadImage2() {
    const uploadtask = storage.storage().ref(`images/${file.name}`).put(file)
    uploadtask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage.storage()
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(imgurl => {

            console.log(imgurl)
            setimg(imgurl)


          })

      })
  }

  function saveBlog() {
    axios.post("https://studiobodhi9555ankit.herokuapp.com/blog-data/1", { title: title, content: content.content, blogphoto: img })
      .then((res) => {
        console.log(res)
      })
  }

  function deleteImage(event, id) {
    axios.delete(`https://studiobodhi9555ankit.herokuapp.com/photo-url/${id}`)
      .then((res) => {
        console.log(res)
        setrp(rp + 1)
      })
  }

  function createImg() {
    return (
      images.map((each) => {
        return (
          <div>
            <img src={each.picurl} style={{ width: "15%", height: "60%" }} />
            <button onClick={(event) => deleteImage(event, each.id)}>Delete</button>
          </div>
        )
      })
    )
  }

  return (
    <div>
      <h1>Upload Image</h1>
      <div style={{ marginBottom: "5%" }}>

        <input type="file" onChange={(event) => change(event)} />
        <button onClick={uploadImage}>Upload</button>
      </div>

      <div style={{ display: "flex", marginLeft: "4%" }}>
        {images !== null ? createImg() : null}
      </div>
      <div className='line'></div>
      <h1>Create Blog</h1>
      <div>
        <div style={{ marginBottom: "5%" }}>

          <input type="file" onChange={(event) => change(event)} />
          <button onClick={uploadImage2}>Upload</button>
        </div>
        <Blog setquestion={setcontent} settitle={settitle} />
        <button style={{ marginLeft: "43%", height: "20%", width: "20%", marginBottom: "2%" }} onClick={saveBlog}>Save</button>

      </div>
      <div className='line'></div>

    </div>
  );
}

export default App;
