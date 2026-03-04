import { prisma } from "@/lib/prisma"
import { createProduct } from "./actions"

import AddTitle from "@/src/components/uploadPage/AddTitle"
import UploadPicture from "@/src/components/uploadPage/UploadPicture"
import DescriptionProduct from "@/src/components/uploadPage/DescriptionProduct"
import AddSpecsProd from "@/src/components/uploadPage/AddSpecsProd"
import AddPrice from "@/src/components/uploadPage/AddPrice"
import AddCategory from "@/src/components/uploadPage/AddCategory"
import AddStatusProd from "@/src/components/uploadPage/AddStatusProd"
import CancelUpload from "@/src/components/uploadPage/CancelUpload"
import AddUpload from "@/src/components/uploadPage/AddUpload"

export default async function UploadPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, status: true },
    orderBy: { createdAt: "asc" },
  })

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Uploaden</h1>

      <form action={createProduct}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <AddTitle defaultValue="" />
            <DescriptionProduct defaultValue="" />

            <div className="grid grid-cols-2 gap-6">
              <AddPrice defaultValue="" />
              <AddCategory categories={categories} defaultValue={undefined} />
            </div>

            <AddStatusProd defaultValue="ACTIEF" />
          </div>

          <div className="space-y-4">
            <UploadPicture productId={undefined} />
            <AddSpecsProd defaultValue={[]} />

            <div className="grid grid-cols-2 gap-6">
              <CancelUpload />
              <AddUpload label="Product Aanmaken" />
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}