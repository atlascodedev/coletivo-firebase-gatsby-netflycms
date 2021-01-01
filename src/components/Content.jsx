import React from "react"

export const HTMLContent = ({ content, className }) => {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  )
}

function Content({ content, className }) {
  return <div className={className}>{content}</div>
}

export default Content
