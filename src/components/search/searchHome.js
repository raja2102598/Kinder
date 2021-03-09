import React from "react"
import { useParams } from "react-router"

function SearchHome() {
  const data = useParams()

  return <div>{data.query}</div>
}

export default SearchHome
