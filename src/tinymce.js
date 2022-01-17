import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import storage from "./fire_base"

export default function Tinymce(props) {

  const [progress, setprogress] = useState(false)

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      if (props.set) {
        props.set(editorRef.current.getContent())
      }

    }
  };



  useEffect(() => {
    console.log(document.querySelector("ae"))
  }, [])



  return (
    <>
      <Editor

        onInit={(evt, editor) => editorRef.current = editor}
        // initialValue={`<input style=border:none;outline:none;width:130%;" placeholder="Write your code" ></input>`}
        apiKey="fyjz4it8ex5trli9saxg0iinhvvetjkqvghmr4n7u0vc79fd"
        value={props.t === "" ? "<h1>No Code or description is available<h1>" : props.t}
        onChange={log}

        content_style=".tox-tinymce{height:900px}"
        init={{
          height: `${props.height}`,
          width: `${props.width}`,
          toolbar_location: "left",
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help  codesample autoresize noneditable'
          ],
          toolbar: '|codesample|' + 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter codesample' +
            'alignright alignjustify | bullist numlist outdent indent image media  | ' +
            'removeformat |' + '|blockquote|' + '|insertdatetime link  charmap anchor|',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img{max-width:100%;height:auto}',
          menubar: "none",
          placeholder: "Write your description.... ",

          file_picker_types: 'file image media',
          image_uploadtab: false,
          image_advtab: true,

          min_height: props.minheight,
          max_height: props.maxheight,
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.classList.add("img-responsive")
            input.onchange = function () {
              var file = this.files[0];
              var reader = new FileReader();

              console.log(file.size / (1024 * 1024))
              if (file.size / (1024 * 1024) <= 100) {
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


                        var src = document.querySelector(".tox-textfield")
                        if (src !== null || src !== undefined) {
                          src.value = imgurl
                        }

                        setprogress(false)
                      })

                  })
              }
              else {
                var src = document.querySelector(".tox-textfield")
                if (src !== null || src !== undefined) {
                  src.value = "File Size > 100mb,upload youtube/drive or any other link"
                }
              }

              // reader.onload = function () {
              //   var id = 'blobid' + (new Date()).getTime();
              //   var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
              //   var base64 = reader.result.split(',')[1];
              //   var blobInfo = blobCache.create(id, file, base64);
              //   blobCache.add(blobInfo);

              //   // call the callback and populate the Title field with the file name
              //   cb(blobInfo.blobUri(), { title: file.name });
              // };

              reader.readAsDataURL(file);
            };

            input.click();

          },
          video_template_callback: function (data) {
            console.log(data)
            // '<video width="' + 571.2 + '" height="' + 320 + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + (data.source2 ? '<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</video>';
            if (data.source === "undefined" || data.source === "File Size &gt; 100mb,upload youtube/drive or any other link") {
              return null
            }
            else {
              return '<video width="' + 571.2 + '" height="' + 320 + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls" src="' + data.source + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />'
            }


          }
        }}
      />
      {/* 
{progress?<img src="https://media.giphy.com/media/hL9q5k9dk9l0wGd4e0/giphy.gif" />:null} */}
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}