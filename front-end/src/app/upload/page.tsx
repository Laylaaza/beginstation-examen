import { prisma } from "@/lib/prisma"

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

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <AddTitle />
          <DescriptionProduct />
          <div className="grid grid-cols-2 gap-6">
            <AddPrice />
            <AddCategory categories={categories} />
          </div>
          <AddStatusProd />
        </div>

        <div className="space-y-4">
          <UploadPicture />
          <AddSpecsProd />
          <div className="grid grid-cols-2 gap-6">
            <CancelUpload />
            <AddUpload />
          </div>
        </div>
      </div>
    </section>
  )
}