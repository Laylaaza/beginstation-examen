"use server"

//IMPORTEER
import { prisma } from "@/lib/prisma"
import { ProductStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

//Type voor binaire data, bijvoorbeeld voor het opslaan van een afbeelding.
type PrismaBytes = Uint8Array<ArrayBuffer>

/* Deze functie werkt een bestaand product bij.
Alle gegevens worden uit het formulier gehaald, gecontroleerd en daarna opgeslagen in de database.*/

export async function updateProduct(formData: FormData) {
  //Haalt het product-ID uit het formulier
  const idRaw = String(formData.get("id") ?? "").trim()
  const id = Number(idRaw)

  //Controleert of het ID een geldig geheel getal is.
  if (!Number.isInteger(id)) throw new Error("Ongeldig product")

  //Haalt de productnaam op
  const name = String(formData.get("name") ?? "").trim()
  if (!name) throw new Error("Productnaam is verplicht")

  //Haalt de beschrijving op
  //Als er niets is ingevuld, wordt de waarde nul
  const descriptionRaw = formData.get("description")
  const description = descriptionRaw ? String(descriptionRaw).trim() : null

  //Haalt de prijs op uit het formulier
  //Komma's worden vervangen door punten zodat decimalen goed verwerkt worden.
  const priceRaw = String(formData.get("price") ?? "").replace(",", ".").trim()
  const price = Number.parseFloat(priceRaw)
  if (!Number.isFinite(price)) throw new Error("Prijs is ongeldig")

  const categoryId = Number.parseInt(String(formData.get("categoryId") ?? "").trim(), 10)
  if (!Number.isInteger(categoryId)) throw new Error("Categorie is verplicht")

  const rawStatus = String(formData.get("status") ?? "").trim()

  if (
    rawStatus !== "ACTIEF" &&
    rawStatus !== "DRAFT" &&
    rawStatus !== "INACTIEF"
  ) {
    throw new Error("Ongeldige status")
  }

  const status: ProductStatus = rawStatus

  //Haalt alle specificatie-name en specificatie-waarden op
  const specsKey = formData.getAll("specsKey").map((v) => String(v).trim())
  const specsValue = formData.getAll("specsValue").map((v) => String(v).trim())

  //Combineert elke sleutel met de bijbehorende waarde tot complete specificaties
  const specifications = specsKey.map((k, i) => ({
    key: k,
    value: (specsValue[i] ?? "").trim(),
  }))

  //Controleert of specificaties volledig zijn ingevuld
  for (const spec of specifications) {
    if ((spec.key && !spec.value) || (!spec.key && spec.value)) {
      throw new Error("Vul bij een specificatie altijd beide velden in")
    }
  }

  //Houdt alleen de volledig ingevulde specificaties over. Lege regels worden dus niet opgeslagen.
  const validSpecifications = specifications.filter(
    (s) => s.key.length > 0 && s.value.length > 0
  )

  //Haalt de eventueel geüploade afbeelding op.
  const image = formData.get("image")

  //Variabelen waarin later de afbeelding opgeslagen kan worden
  let imageData: PrismaBytes | undefined = undefined
  let imageMime: string | undefined = undefined

  //Controleert of er echt een bestand is geüpload en of dit bestand gelezen kan worden.
  if (image && typeof (image as any).arrayBuffer === "function") {
    const fileLike = image as File
    if (fileLike.size > 0) {
      if (fileLike.size > 5 * 1024 * 1024) throw new Error("Afbeelding is te groot, maximaal 5MB")
      if (!fileLike.type?.startsWith("image/")) throw new Error("Ongeldig bestandstype")

      //Zet de afbeelding om naar binaire data, zodat die in de database opgeslagen kan worden
      const bytes = await fileLike.arrayBuffer()
      const u8 = new Uint8Array(bytes)
      imageData = u8 as unknown as PrismaBytes
      imageMime = fileLike.type ?? undefined
    }
  }

  /* Werkt het product in de database bij.
  Eerst worden de nieuwe basisgegevens opgeslagen. Daarna worden de oude specificaties verwijderd
  en vervangen door de nieuwe specificaties. */

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
        create: validSpecifications,
      },
    },
  })

  //Vernieuwt de productoverzichtspagina zodat de nieuwste data zichtbaar is
  revalidatePath("/products")

  //Vernieuwt ook de bewerkpagina van dit specifieke product
  revalidatePath(`/products/${id}/edit`)

  //Stuurt de gebruiker na het opslaan terug naar het productoverzicht
  redirect("/products")
}

//Deze functie verwijdert een product op basis van het ID
export async function deleteProductById(id: number) {
  if (!Number.isInteger(id)) throw new Error("Ongeldig product")

  //Verwijdert twee verwijderacties in één transactie uit:
  //1. Eerst alle specificaties van het product verwijderen
  //2. Daarna pas het product zelf verwijderen
  //Dit voorkomt fouten als er nog gekoppelde specificaties bestaan.

  await prisma.$transaction([
    prisma.specification.deleteMany({ where: { productId: id } }),
    prisma.product.delete({ where: { id } }),
  ])

  revalidatePath("/products")
}