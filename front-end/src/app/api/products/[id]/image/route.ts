import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: Request, context: { params?: { id?: string } }) {
  const url = new URL(req.url)

  const idFromParams = context?.params?.id
  const match = url.pathname.match(/\/api\/products\/(\d+)\/image$/)
  const idFromPath = match?.[1]

  const id = idFromParams ?? idFromPath
  const productId = Number(id)

  if (!id || !Number.isInteger(productId)) {
    return new Response(
      JSON.stringify({
        error: "Bad Request",
        gotParams: context?.params ?? null,
        pathname: url.pathname,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { imageData: true, imageMime: true },
  })

  if (!product?.imageData) {
    return new Response("Not Found", { status: 404 })
  }

  return new Response(product.imageData, {
    headers: {
      "Content-Type": product.imageMime ?? "application/octet-stream",
      "Cache-Control": "no-store",
    },
  })
}