import React from "react"
import { Link, useParams } from "react-router-dom"

function Feeds() {
  const { userid } = useParams()

  return <div>{userid}</div>
}

export default Feeds
