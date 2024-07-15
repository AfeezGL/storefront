"use client"

import { useIntegraflow } from "@lib/hooks/useIntegraflow"
import { Text } from "@medusajs/ui"
import { useEffect } from "react"

export const NoSearchResults = ({ query }: { query: string }) => {
  const { integraflow } = useIntegraflow()

  useEffect(() => {
    integraflow?.track("no_search_results", { query })
  }, [query, integraflow])

  return <Text className="ml-8 small:ml-14 mt-3">No results.</Text>
}
