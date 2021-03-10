import React from "react"
import { useParams } from "react-router"
import Header from "../Feeds/header"

function SearchHome() {
  const data = useParams()

  return (
    <div>
      <Header></Header>
      <button className="btn btn-dark">{data.query}</button>
    </div>
  )
}

export default SearchHome
