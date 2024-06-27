"use client"

import { removeNullValues } from "@lib/util/my-utils"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect } from "react"

type ProductInfoProps = {
  product: PricedProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  useEffect(() => {
    const trackEvent = async () => {
      const Integraflow = (await import("integraflow-js")).default

      Integraflow.getClient().track(
        "view_product",
        removeNullValues({
          collection_id: product.collection_id,
          title: product.title,
          subtitle: product.subtitle,
          type: product.type,
          weight: product.weight,
          discountable: product.discountable,
          is_giftcard: product.is_giftcard,
          id: product.id,
          handle: product.handle,
        })
      )
    }

    trackEvent()
  }, [])

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium | text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium | text-ui-fg-subtle"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
