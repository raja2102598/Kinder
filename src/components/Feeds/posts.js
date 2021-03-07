import React from "react"

import "./styles.css"

function Posts(props) {
  return (
    <article className="Post">
      <header>
        <div className="Post-user">
          <div className="Post-user-avatar">
            <img src={props.avatarurl} alt={props.nickname} />
          </div>
          <div className="Post-user-nickname">
            <span>{props.nickname}</span>
          </div>
        </div>
      </header>
      <div className="Post-image">
        <div className="Post-image-bg">
          <img alt="Broken" src={props.imageurl} />
        </div>
      </div>
      <div className="Post-caption">{props.imageCaption}</div>
    </article>
  )
}

export default Posts
