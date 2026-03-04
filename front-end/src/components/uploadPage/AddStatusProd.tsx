"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"

export default function AddStatusProd({
  defaultValue = "ACTIEF",
}: {
  defaultValue?: "ACTIEF" | "DRAFT" | "INACTIEF"
}) {
  const [status, setStatus] = useState(
    defaultValue === "ACTIEF"
      ? "actief"
      : defaultValue === "DRAFT"
      ? "draft"
      : "inactief"
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <RadioGroup value={status} onValueChange={setStatus} className="flex gap-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="actief" id="status-actief" />
            <label htmlFor="status-actief">Actief</label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="draft" id="status-draft" />
            <label htmlFor="status-draft">Draft</label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inactief" id="status-inactief" />
            <label htmlFor="status-inactief">Inactief</label>
          </div>
        </RadioGroup>

        <input
          type="hidden"
          name="status"
          value={
            status === "actief"
              ? "ACTIEF"
              : status === "draft"
              ? "DRAFT"
              : "INACTIEF"
          }
        />
      </CardContent>
    </Card>
  )
}