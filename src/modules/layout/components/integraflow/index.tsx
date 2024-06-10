"use client"

import Integraflow from "integraflow-js"
import { Fragment, useEffect } from "react"

export const IntegraflowFragment = () => {
  useEffect(() => {
    Integraflow.init({
      appKey: process.env.NEXT_PUBLIC_INTEGRAFLOW_APP_KEY,
    })
  }, [])

  return <Fragment />
}
