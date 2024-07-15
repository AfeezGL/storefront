"use client"

import { useIntegraflow } from "@lib/hooks/useIntegraflow"
import { removeNullValues } from "@lib/util/my-utils"
import { formatAmount } from "@lib/util/prices"
import { InformationCircleSolid } from "@medusajs/icons"
import { Cart, Order } from "@medusajs/medusa"
import { Tooltip } from "@medusajs/ui"
import React, { useEffect } from "react"

type CartTotalsProps = {
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}

const CartTotals: React.FC<CartTotalsProps> = ({ data }) => {
  const { integraflow } = useIntegraflow()
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    })
  }

  useEffect(() => {
    integraflow?.track(
      "view_checkout",
      removeNullValues({
        shipping_tax_total: data.shipping_tax_total,
        shipping_total: data.shipping_total,
        subtotal: data.subtotal,
        tax_total: data.tax_total,
        total: data.total,
        discount_total: data.discount_total,
        gift_card_total: data.gift_card_total,
        gift_card_tax_total: data.gift_card_tax_total,
        item_total: data.items.reduce((total, item) => {
          return total + item.quantity
        }, 0),
      })
    )
  }, [integraflow, data])

  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            Subtotal
            <Tooltip content="Cart total excluding shipping and taxes.">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip>
          </span>
          <span data-testid="cart-subtotal" data-value={subtotal || 0}>
            {getAmount(subtotal)}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              - {getAmount(discount_total)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span data-testid="cart-shipping" data-value={shipping_total || 0}>
            {getAmount(shipping_total)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center">Taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {getAmount(tax_total)}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              - {getAmount(gift_card_total)}
            </span>
          </div>
        )}
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium">
        <span>Total</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {getAmount(total)}
        </span>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals
