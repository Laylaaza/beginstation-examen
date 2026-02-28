"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select"

type CategoryOption = {
  id: number
  name: string
}

type AddCategoryProps = {
  categories: CategoryOption[]
}

export default function AddCategory({ categories }: AddCategoryProps) {
  const [categoryId, setCategoryId] = useState<string>("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Categorie</CardTitle>
      </CardHeader>

      <CardContent>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Kies een categorie" />
          </SelectTrigger>

          <SelectContent>
            {categories.length === 0 ? (
              <SelectItem value="__none__" disabled>
                Geen categorieën gevonden
              </SelectItem>
            ) : (
              categories.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}