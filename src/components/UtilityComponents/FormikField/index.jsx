import { TextField } from "@material-ui/core"
import { useField } from "formik"
import React from "react"

const FormikField = props => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ""

  return (
    <TextField
      {...props}
      placeholder={props.placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      label={props.label}
    />
  )
}

export default FormikField
