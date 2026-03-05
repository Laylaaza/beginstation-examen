"use client"

import { Button } from "@/src/components/ui/button"

type Props = {
  label?: string
  disabled?: boolean
}

export default function AddUpload({ label = "Product Aanmaken", disabled = false }: Props) {
  return (
    <Button type="submit" className="w-full" disabled={disabled}>
      {label}
    </Button>
  )
}