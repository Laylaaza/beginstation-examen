"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"

export default function AddPrice({
  defaultValue = "",
}: {
  defaultValue?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Prijs</CardTitle>
      </CardHeader>

      <CardContent>
        <Input
          name="price"
          type="number"
          step="0.01"
          defaultValue={defaultValue}
          placeholder="0"
          inputMode="decimal"
        />
      </CardContent>
    </Card>
  )
}