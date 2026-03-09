"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { CategoryStatus, ProductStatus } from "@prisma/client"

type CategoryStatusInput = "actief" | "draft" | "inactief"

//Server action om een nieuwe categorie aan te maken in de database
export async function createCategory(data: {
  name: string
  status: CategoryStatusInput
}) {
  //Controle: categorie naam mag niet leeg zijn
  //trim() verwijdert spaties voor en na de tekst
  if (!data.name.trim()) {
    throw new Error("Categorie naam is verplicht")
  }

  //Mapping tussen de status uit het formulier (string)
  // en de enum die Prisma in de database gebruikt
  //Hierdoor kan de gebruiker een leesbare waarde invullen
  //terwijl Prisma de juiste databasewaarde opslaat
  const statusMap: Record<CategoryStatusInput, CategoryStatus> = {
    actief: CategoryStatus.ACTIEF,
    draft: CategoryStatus.DRAFT,
    inactief: CategoryStatus.INACTIEF,
  }

  try {
    //Prisma query om een nieuwe category in de database te maken
    await prisma.category.create({
      data: {
        name: data.name.trim(),
        status: statusMap[data.status],
      },
    })

    //Zorgt ervoor dat de /categories pagina opnieuw wordt opgehaald
    //Zodat de nieuwe categorie direct zichtbaar wordt in de lijst
    revalidatePath("/categories")
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Deze categorie bestaat al")
    }

    throw new Error("Er is iets misgegaan bij het aanmaken van de categorie")
  }
}

//Server action om een categorie uit de database te verwijderen.
export async function deleteCategory(id: number) {
  try {
    //Prisma query die de categorie verwijdert op basis van het id
    //Het id is de unieke identifier van de categorie
    await prisma.category.delete({
      where: { id },
    })

    revalidatePath("/categories")
  } catch (error: any) {
    throw new Error("Categorie kan niet verwijderd worden")
  }
}

//Server action om een bestaande categorie te bewerken
export async function updateCategory(data: {
  id: number
  name: string
  status: CategoryStatusInput
}) {
  const statusMap: Record<CategoryStatusInput, CategoryStatus> = {
    actief: CategoryStatus.ACTIEF,
    draft: CategoryStatus.DRAFT,
    inactief: CategoryStatus.INACTIEF,
  }

  const newStatus = statusMap[data.status]

  try {
    //Voer alles samen uit in één transactie
    await prisma.$transaction(async (tx) => {
      //Update de categorie zelf
      await tx.category.update({
        where: { id: data.id },
        data: {
          name: data.name.trim(),
          status: newStatus,
        },
      })

      //Als de categorie inactief wordt,
      //zet alle gekoppelde producten ook op inactief
      if (newStatus === CategoryStatus.INACTIEF) {
        await tx.product.updateMany({
          where: {
            categoryId: data.id,
          },
          data: {
            status: ProductStatus.INACTIEF,
          },
        })
      }

      //Als de categorie actief wordt,
      //zet alle gekoppelde producten ook op actief
      if (newStatus === CategoryStatus.ACTIEF) {
        await tx.product.updateMany({
          where: {
            categoryId: data.id,
          },
          data: {
            status: ProductStatus.ACTIEF,
          },
        })
      }
    })

    revalidatePath("/categories")
    revalidatePath("/products")
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Deze categorie bestaat al")
    }

    throw new Error("Categorie kon niet worden bijgewerkt")
  }
}