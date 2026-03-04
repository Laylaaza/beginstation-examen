"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/src/components/ui/table"

import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"

import DeleteProductDialog from "@/src/components/modals/DeleteProductDialog"

type ProductRow = {
  id: number
  name: string
  price: number
  status: "ACTIEF" | "DRAFT" | "INACTIEF"
  imageUrl: string | null
  category: { name: string }
}

function statusLabel(status: ProductRow["status"]) {
  if (status === "ACTIEF") return "actief"
  if (status === "DRAFT") return "draft"
  return "inactief"
}

export default function ProductsTable({ 
  products, 
  }: { 
    products: ProductRow[] }) 
    
    {
        const router = useRouter()
        const [deleteOpen, setDeleteOpen] = useState (false)
        const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Producten</h1>

        <Button className="gap-2" onClick={() => router.push("/upload")}>
          <Plus className="h-4 w-4" />
          Voeg product toe
        </Button>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Afb.</TableHead>
              <TableHead>Productnaam.</TableHead>
              <TableHead>Categorie.</TableHead>
              <TableHead>Prijs.</TableHead>
              <TableHead>Status.</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  Nog geen producten gevonden
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
<TableCell>
  <div className="h-10 w-10 overflow-hidden rounded-md border">
    <img
      src={`/api/products/${product.id}/image`}
      alt={product.name}
      className="h-10 w-10 object-cover"
      onError={(e) => {
        ;(e.currentTarget as HTMLImageElement).src = "/products/placeholder.png"
      }}
    />
  </div>
</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>€{product.price.toFixed(2)}</TableCell>

                  <TableCell>
                    <Badge variant={product.status === "ACTIEF" ? "default" : "secondary"}>
                      {statusLabel(product.status)}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => router.push(`/products/${product.id}/edit`)}>
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => {
                        setSelectedProduct(product)
                        setDeleteOpen(true)
                      }}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteProductDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        product={selectedProduct}
      />
    </section>
  )
}