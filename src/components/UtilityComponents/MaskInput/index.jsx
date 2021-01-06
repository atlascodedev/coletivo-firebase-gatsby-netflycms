import { TextField } from "@material-ui/core"
import React from "react"
import InputMask from "react-input-mask"

const MaskInput = props => {
  return (
    <InputMask
      mask={props.mask}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      label={props.label}
      maskChar={null}
      color={props.color}
    >
      {inputProps => <TextField fullWidth={props.fullWidth} {...inputProps} />}
    </InputMask>
  )
}

export default MaskInput
