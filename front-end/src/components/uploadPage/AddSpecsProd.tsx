"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"

type Spec = { key: string; value: string }

type Props = {
  defaultValue?: Spec[]
  rows?: number
  onValidityChange?: (valid: boolean) => void
}

export default function AddSpecsProd({
  defaultValue = [],
  rows = 3,
  onValidityChange,
}: Props) {
  const initial = useMemo<Spec[]>(() => {
    const filled = defaultValue.map((s) => ({
      key: s.key ?? "",
      value: s.value ?? "",
    }))

    while (filled.length < rows) filled.push({ key: "", value: "" })

    return filled.slice(0, rows)
  }, [defaultValue, rows])

  const [specs, setSpecs] = useState<Spec[]>(initial)

  const hasIncompleteSpec = specs.some(
    (spec) =>
      (spec.key.trim() !== "" && spec.value.trim() === "") ||
      (spec.key.trim() === "" && spec.value.trim() !== "")
  )

  useEffect(() => {
    const valid = !hasIncompleteSpec

    onValidityChange?.(valid)

    window.dispatchEvent(
      new CustomEvent("specs-validity-change", {
        detail: { valid },
      })
    )
  }, [hasIncompleteSpec, onValidityChange])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Specificaties</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="contents">
              <Input
                name="specsKey"
                value={spec.key}
                onChange={(e) => {
                  const nextKey = e.target.value
                  setSpecs((prev) =>
                    prev.map((s, i) => (i === index ? { ...s, key: nextKey } : s))
                  )
                }}
                placeholder="Specificatie"
                autoComplete="off"
              />

              <Input
                name="specsValue"
                value={spec.value}
                onChange={(e) => {
                  const nextValue = e.target.value
                  setSpecs((prev) =>
                    prev.map((s, i) => (i === index ? { ...s, value: nextValue } : s))
                  )
                }}
                placeholder="Waarde"
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        {hasIncompleteSpec && (
          <p className="mt-2 text-sm text-red-500">
            Vul bij een specificatie altijd beide velden in.
          </p>
        )}
      </CardContent>
    </Card>
  )
}