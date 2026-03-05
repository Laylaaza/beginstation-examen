import { prisma } from "@/lib/prisma"
import { createProduct } from "./actions"
import UploadFormClient from "./UploadFormClient"

export default async function UploadPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, status: true },
    orderBy: { createdAt: "asc" },
  })

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Uploaden</h1>
      <UploadFormClient categories={categories} action={createProduct} />
    </section>
  )
}