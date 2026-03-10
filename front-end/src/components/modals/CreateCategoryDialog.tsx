"use client"

import { useState } from "react"
import { createCategory } from "@/src/app/categories/actions"

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

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateCategoryDialog({
  open,
  onOpenChange,
}: Props) {
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"actief" | "draft" | "inactief">("actief")
  const [loading, setLoading] = useState(false)
  const nameValid = name.trim().length > 0

  async function handleCreate() {
    if (!name.trim()) return

    try {
      setLoading(true)

      await createCategory({ name, status })

      setName("")
      setStatus("actief")
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle>Categorie toevoegen</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Categorie naam</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {!nameValid && (
              <p className="text-sm text-red-500">
                Categorie naam is verplicht.
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(value: any) => setStatus(value)}
              className="flex gap-6"
            >
              <RadioGroupItem value="actief" id="create-actief" />
              <Label htmlFor="create-actief">Actief</Label>

              <RadioGroupItem value="draft" id="create-draft" />
              <Label htmlFor="create-draft">Draft</Label>

              <RadioGroupItem value="inactief" id="create-inactief" />
              <Label htmlFor="create-inactief">Inactief</Label>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>

          <Button onClick={handleCreate} disabled={!nameValid || loading }>
            {loading ? "Bezig..." : "Opslaan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}