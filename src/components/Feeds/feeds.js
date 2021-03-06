import React from "react"
import { Link, useParams } from "react-router-dom"
import Header from "./header"



function Feeds() {
  const { userid } = useParams()

  return (
    <div>
      <Header user_id={userid}></Header>
    </div>
  )
}


export default Feeds
