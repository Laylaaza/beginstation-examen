import {prisma} from "@/lib/prisma"
import ProductsTable from "./ProductsTable"

export default async function ProductsPage(){
    const products = await prisma.product.findMany({
        orderBy: {createdAt: "desc"},
        include: {
            category: {select: {name : true}},
        },
    })

    return <ProductsTable products={products} />
}