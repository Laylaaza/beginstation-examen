"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"

type StatusValue = "ACTIEF" | "DRAFT" | "INACTIEF"

export default function AddStatusProd({
  defaultValue = "ACTIEF",
}: {
  defaultValue?: StatusValue
}) {
  const [status, setStatus] = useState<StatusValue>(defaultValue)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Status (verplicht)</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <RadioGroup
          value={status}
          onValueChange={(value) => setStatus(value as StatusValue)}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ACTIEF" id="status-actief" />
            <label htmlFor="status-actief">Actief</label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="DRAFT" id="status-draft" />
            <label htmlFor="status-draft">Draft</label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="INACTIEF" id="status-inactief" />
            <label htmlFor="status-inactief">Inactief</label>
          </div>
        </RadioGroup>

        <input type="hidden" name="status" value={status} />
      </CardContent>
    </Card>
  )
}