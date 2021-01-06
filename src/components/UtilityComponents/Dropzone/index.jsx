import { Button } from "@material-ui/core"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

export default function Dropzone({ buttonText, image, setImage }) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        // console.log(binaryStr);

        setImage(binaryStr)
      }
      const myFile = reader.readAsDataURL(file)
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Button variant="outlined" color="primary">
          {buttonText}
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1em",
          marginTop: "1em",
          alignItems: "center",
          maxWidth: "250px",
        }}
      >
        <img style={{ width: "100%", height: "100%" }} src={image} alt="" />
      </div>
    </div>
  )
}
