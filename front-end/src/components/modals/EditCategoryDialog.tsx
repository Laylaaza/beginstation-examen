"use client"

import { useEffect, useState } from "react"
import { updateCategory } from "@/src/app/categories/actions"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Label } from "@/src/components/ui/label"

type Category = {
  id: number
  name: string
  status: "ACTIEF" | "DRAFT" | "INACTIEF"
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
}

export default function EditCategoryDialog({
  open,
  onOpenChange,
  category,
}: Props) {
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"actief" | "draft" | "inactief">("actief")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setStatus(category.status.toLowerCase() as any)
    }
  }, [category])

  async function handleUpdate() {
    if (!category) return

    try {
      setLoading(true)

      await updateCategory({
        id: category.id,
        name,
        status,
      })

      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">

        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Categorie Bewerken?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">

          <div className="space-y-2">
            <Label>Categorienaam</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(value: any) => setStatus(value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="actief" id="edit-actief" />
                <Label htmlFor="edit-actief">Actief</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="edit-draft" />
                <Label htmlFor="edit-draft">Draft</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inactief" id="edit-inactief" />
                <Label htmlFor="edit-inactief">Inactief</Label>
              </div>
            </RadioGroup>
          </div>

        </div>

        <DialogFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Annuleren
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Bezig..." : "Bijwerken"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}