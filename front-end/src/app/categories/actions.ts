"use server"

import {prisma} from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import {CategoryStatus} from "@prisma/client"

type CategoryStatusInput = "actief" | "draft" | "inactief"

export async function createCategory(data:{
    name: string
    status: CategoryStatusInput
}) {
    if (!data.name.trim()){
        throw new Error("Categorie naam is verplicht")
    }

    const statusMap: Record<CategoryStatusInput, CategoryStatus> ={
        actief: CategoryStatus.ACTIEF,
        draft: CategoryStatus.DRAFT,
        inactief: CategoryStatus.INACTIEF,
    }

    try {
        await prisma.category.create({
            data: {
                name: data.name.trim(),
                status: statusMap[data.status],
            },
        })

        revalidatePath("/categories")
    } catch (error: any) {
        if (error.code === "P2002"){
            throw new Error("Deze categorie bestaat al")
        }

        throw new Error("Er is iets misgegaan bij het aanmaken van de categorie")
    }
}

export async function deleteCategory(id:number){
    try{
        await prisma.category.delete({
            where: {id}
        })

        revalidatePath("/categories")
    } catch (error: any) {
        throw new Error("Categorie kan niet verwijderd worden")
    }
}

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

    try{
        await prisma.category.update({
            where: {id: data.id},
            data:{
                name: data.name.trim(),
                status: statusMap[data.status],
            }
        })

        revalidatePath("/categories")
    }   catch(error: any){
        if (error.code == "P2002") {
            throw new Error("Deze categorie bestaat al")
        }

        throw new Error("Categorie kon niet worden bijgewerkt")
    }
}