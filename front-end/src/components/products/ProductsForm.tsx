"use client"

import UploadPicture from "../uploadPage/UploadPicture"
import AddTitle from "../uploadPage/AddTitle"
import DescriptionProduct from "../uploadPage/DescriptionProduct"
import AddSpecsProd from "../uploadPage/AddSpecsProd"
import AddPrice from "../uploadPage/AddPrice"
import AddCategory from "../uploadPage/AddCategory"
import AddStatusProd from "../uploadPage/AddStatusProd"
import CancelUpload from "../uploadPage/CancelUpload"
import AddUpload from "../uploadPage/AddUpload"

type CategoryOption = {id: number; name: string; status: string}
type Spec = {key: string; value: string}

type InitialProduct = {
    id?: number
    name?: string
    description?: string | null
    price?: number
    categoryId?: number
    status?: "ACTIEF" | "DRAFT" | "INACTIEF"
    specifications?: Spec[]
}

export default function ProductForm({
    categories,
    initial,
    action,
    submitLabel,
}: {
    categories: CategoryOption[]
    initial?: InitialProduct
    action: (formData: FormData) => void
    submitLabel: string
}) {
    return(
        <section className="space-y-6">
            <h1 className="text-xl font-semibold">
                {initial?.id ? "Product bijwerken" : "Uploaden"}
            </h1>

            <form action={action}>
                {initial?.id ? <input type = "hidden" name="id" value={initial.id} /> : null}

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <AddTitle defaultValue={initial?.name ?? ""} />
                        <DescriptionProduct defaultValue={initial?.description ?? ""} />
                    

                    <div className="grid grid-cols-2 gap-6">
                        <AddPrice defaultValue={initial?.price?.toString() ?? ""} />
                        <AddCategory categories={categories} defaultValue={initial?.categoryId} />
                    </div>

                    <AddStatusProd defaultValue={initial?.status ?? "ACTIEF"} />
                </div>

                <div className="space-y-4">
                    <UploadPicture productId={initial?.id} />
                    <AddSpecsProd defaultValue={initial?.specifications ?? []} />

                    <div className="grid grid-cols-2 gap-6">
                        <CancelUpload />
                        <AddUpload label={submitLabel} />
                    </div>
                </div>
                </div>
            </form>
        </section>
    )
}