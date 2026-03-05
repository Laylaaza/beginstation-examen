import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProductSpecificView from "./ProductSpecificView"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductSpecificPage({ params }: PageProps) {
  const { id } = await params
  const productId = Number(id)

  if (!Number.isFinite(productId)) notFound()

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
      specifications: true,
    },
  })

  if (!product) notFound()

  return (
    <ProductSpecificView
      product={{
        id: product.id,
        name: product.name,
        seller: product.seller ?? "",
        description: product.description ?? "",
        price: product.price,
        status: product.status,
        categoryName: product.category.name,
        imageUrl: product.imageUrl,
        hasImageBlob: Boolean(product.imageData && product.imageMime),
        specifications: product.specifications,
      }}
    />
  )
}