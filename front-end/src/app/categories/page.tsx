import {prisma} from "@/lib/prisma"
import CategoriesClient from "./CategoriesClient"

export default async function CategoriesPage(){
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: {products: true},
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return(
        <CategoriesClient
            categories={categories.map((category) => ({
                id: category.id,
                name: category.name,
                status: category.status,
                _count: {
                    products: category._count.products,
                },
            }))}
        />
    )
}