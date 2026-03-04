import { prisma } from "@/lib/prisma"
import { updateProduct } from "./actions"

import AddTitle from "@/src/components/uploadPage/AddTitle"
import UploadPicture from "@/src/components/uploadPage/UploadPicture"
import DescriptionProduct from "@/src/components/uploadPage/DescriptionProduct"
import AddSpecsProd from "@/src/components/uploadPage/AddSpecsProd"
import AddPrice from "@/src/components/uploadPage/AddPrice"
import AddCategory from "@/src/components/uploadPage/AddCategory"
import AddStatusProd from "@/src/components/uploadPage/AddStatusProd"
import CancelUpload from "@/src/components/uploadPage/CancelUpload"
import AddUpload from "@/src/components/uploadPage/AddUpload"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: idParam } = await params
  const id = Number(idParam)

  if (!Number.isInteger(id)) {
    return <div>Ongeldig product id</div>
  }

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, status: true },
    orderBy: { createdAt: "asc" },
  })

  const product = await prisma.product.findUnique({
    where: { id },
    include: { specifications: true },
  })

  if (!product) {
    return <div>Product niet gevonden</div>
  }

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Product bijwerken</h1>

      <form action={updateProduct}>
        <input type="hidden" name="id" value={product.id} />

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <AddTitle defaultValue={product.name} />
            <DescriptionProduct defaultValue={product.description ?? ""} />

            <div className="grid grid-cols-2 gap-6">
              <AddPrice defaultValue={String(product.price)} />
              <AddCategory categories={categories} defaultValue={product.categoryId} />
            </div>

            <AddStatusProd defaultValue={product.status} />
          </div>

          <div className="space-y-4">
            <UploadPicture productId={product.id} />
            <AddSpecsProd
              defaultValue={product.specifications.map((s) => ({
                key: s.key,
                value: s.value,
              }))}
              rows={3}
            />

            <div className="grid grid-cols-2 gap-6">
              <CancelUpload />
              <AddUpload label="Opslaan" />
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}