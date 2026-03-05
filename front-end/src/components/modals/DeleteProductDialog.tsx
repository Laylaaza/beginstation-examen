"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteProductById } from "@/src/app/products/[id]/edit/actions"
import { AlertTriangle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog"

import { Button } from "@/src/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: number
    name: string
  } | null
}

export default function DeleteProductDialog({
  open,
  onOpenChange,
  product,
}: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!product) return

    try {
      setLoading(true)
      await deleteProductById(product.id)

      onOpenChange(false)

      // refresh products table
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>

          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Product Verwijderen?
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            Weet u zeker dat u "{product?.name}" wilt verwijderen? Deze actie kan
            niet ongedaan worden.
          </p>

          <DialogFooter className="flex justify-center gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuleren
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Bezig..." : "Verwijderen"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}