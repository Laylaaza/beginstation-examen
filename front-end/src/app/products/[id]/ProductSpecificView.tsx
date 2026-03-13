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

const statusLabels = {
  ACTIEF: "Actief",
  DRAFT: "Draft",
  INACTIEF: "Inactief",
} as const

export default function ProductSpecificView({ product }: Props) {
  const router = useRouter()

  const statusLabel = statusLabels[product.status]

  const imageUrl = product.imageUrl?.trim()
  const imageSrc = imageUrl
    ? imageUrl
    : product.hasImageBlob
      ? `/api/products/${product.id}/image`
      : ""

  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Product specificaties</h1>
        <p className="text-sm text-muted-foreground">
          Bekijk hier alle productinformatie in een duidelijk overzicht.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
          <div className="grid gap-5">
            <ReadField label="Titel product" value={product.name} />
            <ReadField label="Naam verkoper" value={product.seller} />
            <ReadField label="Beschrijving product" value={product.description} large />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <ReadField label="Prijs" value={`€${formatPrice(product.price)}`} />
            <ReadField label="Categorie" value={product.categoryName} />
          </div>

          <ReadField label="Status" value={statusLabel} />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Afbeelding product
            </p>

            <div className="flex min-h-[260px] items-center justify-center rounded-2xl border bg-muted/20 p-6">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="max-h-64 w-auto max-w-full object-contain"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).src =
                      "/products/placeholder.png"
                  }}
                />
              ) : (
                <div className="text-sm text-muted-foreground">Geen afbeelding</div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Specificaties
            </p>

            {product.specifications.length > 0 ? (
              <div className="space-y-3">
                {product.specifications.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-start justify-between gap-4 rounded-xl border bg-muted/20 px-4 py-3"
                  >
                    <span className="text-sm font-medium">{s.key}</span>
                    <span className="text-sm text-muted-foreground text-right">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed px-4 py-6 text-sm text-muted-foreground">
                Geen specificaties toegevoegd.
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Annuleren
            </Button>

            <Button
              type="button"
              onClick={() => router.push(`/products/${product.id}/edit`)}
            >
              Product bewerken
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReadField({
  label,
  value,
  large = false,
}: {
  label: string
  value: string
  large?: boolean
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div
        className={`rounded-xl border bg-muted/20 px-4 py-3 text-sm ${
          large ? "min-h-[110px]" : ""
        }`}
      >
        {value || "-"}
      </div>
    </div>
  )
}

function formatPrice(price: number) {
  return price.toFixed(2).replace(".", ",")
}