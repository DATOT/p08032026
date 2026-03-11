"use client"

import { useEffect } from "react"
import "./styles.css"

export default function Page() {
  useEffect(() => {
    import("./script")
  }, [])

  return (
    <main data-page="tran-ho-ngoc-tram">
      {/* Migrated from index.html */}
    </main>
  )
}
