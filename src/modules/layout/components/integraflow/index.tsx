"use client"

import { Fragment, useEffect } from "react"

export const IntegraflowFragment = () => {
  useEffect(() => {
    const init = async () => {
      const Integraflow = (await import("integraflow-js")).default

      Integraflow.init({
        appKey: process.env.NEXT_PUBLIC_INTEGRAFLOW_APP_KEY,
      })
    }
    init()
  }, [])

  return <Fragment />
}
