"use server"

import { prisma } from "@/lib/prisma"
import { ProductStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type PrismaBytes = Uint8Array<ArrayBuffer>

function normaliseStatus(input: string): ProductStatus {
  const v = input.toLowerCase().trim()
  if (v === "actief") return ProductStatus.ACTIEF
  if (v === "draft") return ProductStatus.DRAFT
  if (v === "inactief") return ProductStatus.INACTIEF
  if (input === "ACTIEF" || input === "DRAFT" || input === "INACTIEF") return input as ProductStatus
  throw new Error("Ongeldige status")
}

export async function updateProduct(formData: FormData) {
  const idRaw = String(formData.get("id") ?? "").trim()
  const id = Number(idRaw)
  if (!Number.isInteger(id)) throw new Error("Ongeldig product")

  const name = String(formData.get("name") ?? "").trim()
  if (!name) throw new Error("Productnaam is verplicht")

  const descriptionRaw = formData.get("description")
  const description = descriptionRaw ? String(descriptionRaw).trim() : null

  const priceRaw = String(formData.get("price") ?? "").replace(",", ".").trim()
  const price = Number.parseFloat(priceRaw)
  if (!Number.isFinite(price)) throw new Error("Prijs is ongeldig")

  const categoryId = Number.parseInt(String(formData.get("categoryId") ?? "").trim(), 10)
  if (!Number.isInteger(categoryId)) throw new Error("Categorie is verplicht")

  const status = normaliseStatus(String(formData.get("status") ?? "").trim())

  const specsKey = formData.getAll("specsKey").map((v) => String(v).trim())
  const specsValue = formData.getAll("specsValue").map((v) => String(v).trim())

  const specifications = specsKey
    .map((k, i) => ({ key: k, value: (specsValue[i] ?? "").trim() }))
    .filter((s) => s.key.length > 0 && s.value.length > 0)

  const image = formData.get("image")
  let imageData: PrismaBytes | undefined = undefined
  let imageMime: string | undefined = undefined

  if (image && typeof (image as any).arrayBuffer === "function") {
    const fileLike = image as File
    if (fileLike.size > 0) {
      if (fileLike.size > 5 * 1024 * 1024) throw new Error("Afbeelding is te groot, maximaal 5MB")
      if (!fileLike.type?.startsWith("image/")) throw new Error("Ongeldig bestandstype")
      const bytes = await fileLike.arrayBuffer()
      const u8 = new Uint8Array(bytes)
      imageData = u8 as unknown as PrismaBytes
      imageMime = fileLike.type ?? undefined
    }
  }

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      status,
      categoryId,
      imageData,
      imageMime,
      specifications: {
        deleteMany: {},
        create: specifications,
      },
    },
  })

  revalidatePath("/products")
  revalidatePath(`/products/${id}/edit`)
  redirect("/products")
}

export async function deleteProductById(id: number) {
  if (!Number.isInteger(id)) throw new Error("Ongeldig product")

  await prisma.$transaction([
    prisma.specification.deleteMany({ where: { productId: id } }),
    prisma.product.delete({ where: { id } }),
  ])

  revalidatePath("/products")
}