import React from "react"

import { Avatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { deepOrange, deepPurple } from "@material-ui/core/colors"

import "./styles.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}))

function Posts(props) {
  const classes = useStyles()
  console.log(props)
  return (
    <article className="Post">
      <header>
        <div className="Post-user">
          <div className="Post-user-avatar">
            {props.avatarurl == "" ? (
              <Avatar className={classes.orange}>{props.nickname[0]}</Avatar>
            ) : (
              <img src={props.avatarurl} alt={props.nickname} />
            )}
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
      <div className="Post-caption justify-content-end">
        <i>{props.time}</i>
      </div>
    </article>
  )
}

export default Posts
