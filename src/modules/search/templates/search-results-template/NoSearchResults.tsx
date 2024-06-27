"use client"

import { Text } from "@medusajs/ui"
import { useEffect } from "react"

export const NoSearchResults = ({ query }: { query: string }) => {
  useEffect(() => {
    const trackEvent = async () => {
      const Integraflow = (await import("integraflow-js")).default

      Integraflow.getClient().track("no_search_results", { query })
    }
    trackEvent()
  }, [])

  return <Text className="ml-8 small:ml-14 mt-3">No results.</Text>
}
