"use client"
import { useSession } from "next-auth/react"

const user = () => {
    const { data: session,}=useSession();
  return (
    <pre>{JSON.stringify(session)}</pre>
  )
}

export default user
