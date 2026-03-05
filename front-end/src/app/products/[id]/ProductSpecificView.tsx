"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"

type Spec = {
  id: number
  key: string
  value: string
}

type Props = {
  product: {
    id: number
    name: string
    seller: string
    description: string
    price: number
    status: "ACTIEF" | "DRAFT" | "INACTIEF"
    categoryName: string
    imageUrl: string | null
    hasImageBlob: boolean
    specifications: Spec[]
  }
}

export default function ProductSpecificView({ product }: Props) {
  const router = useRouter()

  const statusLabel =
    product.status === "ACTIEF"
      ? "Actief"
      : product.status === "DRAFT"
        ? "Draft"
        : "Inactief"

  const imageUrl = product.imageUrl?.trim()
  const imageSrc = imageUrl
    ? imageUrl
    : product.hasImageBlob
      ? `/api/products/${product.id}/image`
      : ""

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Product Specificaties</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <ReadField label="Titel product" value={product.name} />
          <ReadField label="Naam Verkoper" value={product.seller} />
          <ReadField label="Beschrijving product" value={product.description} />

          <div className="grid grid-cols-2 gap-6">
            <ReadField label="Prijs" value={`€${formatPrice(product.price)}`} />
            <ReadField label="Categorie" value={product.categoryName} />
          </div>

          <ReadField label="Status" value={statusLabel} />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Afbeelding product</p>

            <div className="rounded-xl border bg-white p-6 max-w-md">
                <div className="mx-auto flex items-center justify-center h-40 w-40 overflow-hidden rounded-md bg-white">
                {imageSrc ? (
                    <img
                    src={imageSrc}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).src =
                        "/products/placeholder.png"
                    }}
                    />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Geen afbeelding
                  </div>
                )}
              </div>
            </div>
          </div>

          {product.specifications.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Specificaties</p>

              <div className="rounded-xl border bg-white p-4">
                <div className="space-y-2">
                  {product.specifications.map((s) => (
                    <div key={s.id} className="text-sm">
                      <span className="font-medium">{s.key}</span>
                      <span>: </span>
                      <span>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-6">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Annuleren
            </Button>

            <Button
              type="button"
              onClick={() => router.push(`/products/${product.id}/edit`)}
            >
              Product Bewerken
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="rounded-xl border bg-white px-4 py-3 text-sm">
        {value || "-"}
      </div>
    </div>
  )
}

function formatPrice(price: number) {
  return price.toFixed(0)
}