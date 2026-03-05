"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"

export default function AddTitle({
  defaultValue = "",
}: {
  defaultValue?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Naam Product (verplicht) </CardTitle>
      </CardHeader>

      <CardContent>
        <Input
          name="name"
          defaultValue={defaultValue}
          placeholder="Voer naam van het product in..."
        />
      </CardContent>
    </Card>
  )
}