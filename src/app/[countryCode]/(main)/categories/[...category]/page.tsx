import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories, listRegions } from "@lib/data"
import { ProductCategory } from "@medusajs/medusa"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: { category: string[]; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export async function generateStaticParams() {
  const product_categories: ProductCategory[] | null = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes: string[] = await listRegions().then((regions) => {
    if (!regions) {
      return []
    }

    return regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
  })

  const categoryHandles = product_categories.map((category) => category.handle)

  const staticParams = countryCodes
    ?.map((countryCode) =>
      categoryHandles.map((handle) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { product_categories } = await getCategoryByHandle(
      params.category
    ).then((product_categories: any) => product_categories)

    const title = product_categories
      .map((category: any) => category.name)
      .join(" | ")

    const description =
      product_categories[product_categories.length - 1].description ??
      `${title} category.`

    return {
      title: `${title} | Integraflow Store`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams

  const { product_categories } = await getCategoryByHandle(
    params.category
  ).then((product_categories: any) => product_categories)

  if (!product_categories) {
    notFound()
  }

  return (
    <CategoryTemplate
      categories={product_categories}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
