"use client"

import { Button } from "@/src/components/ui/button"

export default function AddUpload({
  label = "Product Aanmaken",
}: {
  label?: string
}) {
  return (
    <Button type="submit" className="w-full">
      {label}
    </Button>
  )
}