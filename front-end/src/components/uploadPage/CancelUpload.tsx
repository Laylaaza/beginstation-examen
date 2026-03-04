"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"

export default function CancelUpload({
  href = "/products",
}: {
  href?: string
}) {
  const router = useRouter()

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => router.push(href)}
    >
      Annuleren
    </Button>
  )
}