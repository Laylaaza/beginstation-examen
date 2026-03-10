"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"

export default function AddPrice({
  defaultValue = "",
}: {
  defaultValue?: string
}) {
  const [price, setPrice] = useState(defaultValue.replace(",", "."))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Prijs</CardTitle>
      </CardHeader>

      <CardContent>
        <Input
          name="price"
          type="text"
          value={price}
          placeholder="0"
          inputMode="decimal"
          onChange={(e) => {
            const value = e.target.value.replace(",", ".")

            if (/^\d*\.?\d{0,2}$/.test(value)) {
              setPrice(value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "-") e.preventDefault()
          }}
        />
      </CardContent>
    </Card>
  )
}