import React from "react"

export const HTMLContent = ({ content, className }) => {
  return (
    <div
      className={className ? className : null}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default HTMLContent
