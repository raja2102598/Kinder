import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import "./styles.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))

function Stories(props) {
  const classes = useStyles()

  return (
    <article className="Post">
      <header>
        <div className={classes.root}>
          {/* <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className={classes.small}
          />
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
          <Avatar
            alt="Z"
            src="/static/images/avatar/1.jpg"
            className={classes.large}
          />
        </div>
      </header>
    </article>
  )
}

export default Stories
