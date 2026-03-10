"use client"

import { useEffect, useState } from "react"
import { Button } from "@/src/components/ui/button"

type Props = {
  label?: string
  disabled?: boolean
}

export default function AddUpload({
  label = "Product Aanmaken",
  disabled = false,
}: Props) {
  const [specsValid, setSpecsValid] = useState(true)

  useEffect(() => {
    function handleSpecsValidityChange(event: Event) {
      const customEvent = event as CustomEvent<{ valid: boolean }>
      setSpecsValid(customEvent.detail.valid)
    }

    window.addEventListener("specs-validity-change", handleSpecsValidityChange)

    return () => {
      window.removeEventListener("specs-validity-change", handleSpecsValidityChange)
    }
  }, [])

  return (
    <Button type="submit" className="w-full" disabled={disabled || !specsValid}>
      {label}
    </Button>
  )
}