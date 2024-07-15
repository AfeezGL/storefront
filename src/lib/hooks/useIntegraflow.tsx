"use client"

import Integraflow from "integraflow-js"
import { useEffect, useState } from "react"

export const useIntegraflow = () => {
  const [integraflow, setIntegraflow] = useState<Integraflow>()

  useEffect(() => {
    const init = async () => {
      const Integraflow = (await import("integraflow-js")).default

      const client = Integraflow.init({
        appKey: process.env.NEXT_PUBLIC_INTEGRAFLOW_APP_KEY,
      })

      setIntegraflow(client)
    }
    init()
  }, [])

  return { integraflow }
}
