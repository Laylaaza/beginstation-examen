"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { Upload } from "lucide-react"

export default function UploadPicture({
  productId,
}: {
  productId?: number
}) {
  const [fileName, setFileName] = useState<string>("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Afbeelding product
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {productId && !fileName && (
          <div className="overflow-hidden rounded-md border">
            <img
              src={`/api/products/${productId}/image`}
              alt="Huidige afbeelding"
              className="h-40 w-full object-cover"
            />
          </div>
        )}

        <label className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-10 text-center transition hover:bg-neutral-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white">
            <Upload className="h-5 w-5 text-neutral-700" />
          </div>

          <div className="text-sm text-neutral-600">
            <p>Sleep &amp; zet neer of klik om te uploaden</p>
            <p className="text-xs text-neutral-500">PNG, JPG tot 5MB</p>

            {fileName && (
              <p className="text-xs text-neutral-600">
                Gekozen: {fileName}
              </p>
            )}
          </div>

          <input
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </CardContent>
    </Card>
  )
}