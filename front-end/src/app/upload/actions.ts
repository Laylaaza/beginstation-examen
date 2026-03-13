"use server"

import { prisma } from "@/lib/prisma"
import { ProductStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

//Speciaal type dat gebruikt wordt om binaire data (zoals een afbeelding) op te slaan
type PrismaBytes = Uint8Array<ArrayBuffer>

//Type voor de status van de actie
//Hiermee kan een foutmelding worden teruggeven aan het formulier
type ActionState = {
  error: string | null
}

export async function createProduct(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {

  const name = String(formData.get("name") ?? "").trim()
  if (!name) return { error: "Productnaam is verplicht" }

  const seller = String(formData.get("seller") ?? "").trim()
  if (!seller) return { error: "Verkoper is verplicht" }

  const descriptionRaw = formData.get("description")
  const description = descriptionRaw ? String(descriptionRaw).trim() : null

  const priceRaw = String(formData.get("price") ?? "").replace(",", ".").trim()
  const price = Number.parseFloat(priceRaw)
  if (!Number.isFinite(price) || price < 0) {
    return {
      error: "Prijs moet 0 of hoger zijn",
    }
  }

  const categoryIdRaw = String(formData.get("categoryId") ?? "").trim()
  const categoryId = Number.parseInt(categoryIdRaw, 10)
  if (!Number.isInteger(categoryId)) return { error: "Categorie is verplicht" }

  const statusRaw = String(formData.get("status") ?? "").trim()

  if (
    statusRaw !== "ACTIEF" &&
    statusRaw !== "DRAFT" &&
    statusRaw !== "INACTIEF"
  ) {
    return { error: "Ongeldige status" }
  }

  const status: ProductStatus = statusRaw

  const specsKey = formData.getAll("specsKey").map((v) => String(v).trim())
  const specsValue = formData.getAll("specsValue").map((v) => String(v).trim())

  const specifications = specsKey
    .map((k, i) => ({
      key: k,
      value: (specsValue[i] ?? "").trim(),
    }))
    .filter((s) => s.key.length > 0 && s.value.length > 0)

  const image = formData.get("image")

  let imageData: PrismaBytes | null = null
  let imageMime: string | null = null

  if (image && typeof (image as any).arrayBuffer === "function") {
    const fileLike = image as File

    if (fileLike.size > 0) {
      if (fileLike.size > 5 * 1024 * 1024) {
        return { error: "Afbeelding is te groot, maximaal 5MB" }
      }

      if (!fileLike.type?.startsWith("image/")) {
        return { error: "Ongeldig bestandstype" }
      }

      const bytes = await fileLike.arrayBuffer()
      const u8 = new Uint8Array(bytes)
      imageData = u8 as unknown as PrismaBytes
      imageMime = fileLike.type ?? null
    }
  }

  await prisma.product.create({
    data: {
      name,
      seller,
      description,
      price,
      status,
      categoryId,
      imageData,
      imageMime,
      specifications: specifications.length
        ? { create: specifications }
        : undefined,
    },
  })

  revalidatePath("/products")
  redirect("/products")
}