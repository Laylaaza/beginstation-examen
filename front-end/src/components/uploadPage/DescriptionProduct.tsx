"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { Textarea } from "@/src/components/ui/textarea"

export default function DescriptionProduct({
  defaultValue = "",
}: {
  defaultValue?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Beschrijving Product
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Textarea
          name="description"
          defaultValue={defaultValue}
          placeholder="Voer productbeschrijving in..."
          className="min-h-36 resize-none"
        />
      </CardContent>
    </Card>
  )
}