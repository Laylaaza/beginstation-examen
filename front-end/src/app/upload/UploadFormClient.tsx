"use client"

import { useActionState, useCallback, useMemo, useState } from "react"

import AddTitle from "@/src/components/uploadPage/AddTitle"
import UploadPicture from "@/src/components/uploadPage/UploadPicture"
import DescriptionProduct from "@/src/components/uploadPage/DescriptionProduct"
import AddSpecsProd from "@/src/components/uploadPage/AddSpecsProd"
import AddPrice from "@/src/components/uploadPage/AddPrice"
import AddCategory from "@/src/components/uploadPage/AddCategory"
import AddStatusProd from "@/src/components/uploadPage/AddStatusProd"
import CancelUpload from "@/src/components/uploadPage/CancelUpload"
import AddUpload from "@/src/components/uploadPage/AddUpload"
import AddSeller from "@/src/components/uploadPage/AddSeller"

type Category = {
  id: number
  name: string
  status: string
}

type ActionState = {
  error: string | null
}

export default function UploadFormClient({
  categories,
  action,
}: {
  categories: Category[]
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
}) {
  const [state, formAction, isPending] = useActionState(action, { error: null })
  const [isValid, setIsValid] = useState(false)

  const validate = useCallback((form: HTMLFormElement) => {
    const fd = new FormData(form)

    const name = String(fd.get("name") ?? "").trim()
    const seller = String(fd.get("seller") ?? "").trim()

    const priceRaw = String(fd.get("price") ?? "").trim().replace(",", ".")
    const price = Number.parseFloat(priceRaw)

    const categoryId = String(fd.get("categoryId") ?? "").trim()
    const status = String(fd.get("status") ?? "").trim()

    const ok =
      name.length > 0 &&
      seller.length > 0 &&
      Number.isFinite(price) &&
      categoryId.length > 0 &&
      status.length > 0

    setIsValid(ok)
  }, [])

  const onFormInput = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      validate(e.currentTarget as HTMLFormElement)
    },
    [validate]
  )

  const disabled = useMemo(() => !isValid || isPending, [isValid, isPending])

  return (
    <form action={formAction} onInput={onFormInput} onChange={onFormInput}>
      {state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <AddTitle defaultValue="" />
          <AddSeller defaultValue="" />
          <DescriptionProduct defaultValue="" />

          <div className="grid grid-cols-2 gap-6">
            <AddPrice defaultValue="" />
            <AddCategory categories={categories} defaultValue={undefined} />
          </div>
        </div>

        <div className="space-y-4">
          <UploadPicture productId={undefined} />
          <AddStatusProd defaultValue="ACTIEF" />
          <AddSpecsProd defaultValue={[]} />

          <div className="grid grid-cols-2 gap-6">
            <CancelUpload />
            <AddUpload label={isPending ? "Bezig..." : "Product Aanmaken"} disabled={disabled} />
          </div>
        </div>
      </div>
    </form>
  )
}