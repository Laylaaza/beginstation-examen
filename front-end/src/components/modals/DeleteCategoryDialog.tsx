"use client"

import { useState } from "react"
import { deleteCategory } from "@/src/app/categories/actions"
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
  category: {
    id: number
    name: string
  } | null
}

export default function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
}: Props) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!category) return

    try {
      setLoading(true)
      await deleteCategory(category.id)
      onOpenChange(false)
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
              Categorie Verwijderen?
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600">
            Weet u zeker dat u "{category?.name}" wilt verwijderen?
            Deze actie kan niet ongedaan worden.
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