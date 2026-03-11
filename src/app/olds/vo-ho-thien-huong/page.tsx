"use client"

import { useEffect } from "react"
import "./styles.css"

export default function Page() {
  useEffect(() => {
    import("./script")
  }, [])

  return (
    <main data-page="vo-ho-thien-huong">
      {/* Migrated from index.html */}
    </main>
  )
}
