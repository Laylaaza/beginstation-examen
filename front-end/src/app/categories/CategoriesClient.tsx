    "use client"

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
    import { Pencil, Plus } from "lucide-react"

    import CreateCategoryDialog from "../../components/modals/CreateCategoryDialog"
    import EditCategoryDialog from "@/src/components/modals/EditCategoryDialog"

    // Type voor één categorie
    // Hiermee leg je vast hoe een categorie object eruit moet zien
    type Category = {
    id: number
    name: string
    status: "ACTIEF" | "DRAFT" | "INACTIEF"
    _count: {
        products: number
    }
    }

    // Vertaling van databasewaarden naar nette labels voor op het scherm
    const statusLabels = {
    ACTIEF: "Actief",
    DRAFT: "Draft",
    INACTIEF: "Inactief",
    } as const

    // Styling per status
    // Zo krijgt elke status een eigen kleur in de badge
    const statusClasses = {
    ACTIEF: "bg-green-100 text-green-700",
    DRAFT: "bg-yellow-100 text-yellow-700",
    INACTIEF: "bg-gray-100 text-gray-600",
    } as const

    // Deze component ontvangt een lijst met categorieën als props
    export default function CategoriesClient({
    categories,
    }: {
    categories: Category[]
    }) {
    // State om te bepalen of de modals open staan
    const [createOpen, setCreateOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)

    // Hierin wordt de geselecteerde categorie opgeslagen
    // zodat die in de bewerkmodal getoond kan worden
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    return (
        <section className="space-y-6">
        {/* Kop van de pagina met titel en knop */}
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Categorieën</h1>

            <Button
            className="gap-2"
            onClick={() => setCreateOpen(true)}
            >
            <Plus className="h-4 w-4" />
            Voeg Categorie Toe
            </Button>
        </div>

        {/* Tabel met alle categorieën */}
        <div className="rounded-2xl border bg-white shadow-sm">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Categorie Naam</TableHead>
                <TableHead>Aantal Producten</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acties</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {categories.map((category) => (
                <TableRow key={category.id}>
                    {/* Naam van de categorie */}
                    <TableCell className="font-medium">
                    {category.name}
                    </TableCell>

                    {/* Aantal gekoppelde producten */}
                    <TableCell>
                    {category._count.products}
                    </TableCell>

                    {/* Status van de categorie als badge */}
                    <TableCell>
                    <Badge className={statusClasses[category.status]}>
                        {statusLabels[category.status]}
                    </Badge>
                    </TableCell>

                    {/* Actieknoppen */}
                    <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        {/* Knop om categorie te bewerken */}
                        <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            setSelectedCategory(category)
                            setEditOpen(true)
                        }}
                        >
                        <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                    </TableCell>
                </TableRow>
                ))}

                {/* Bericht wanneer er geen categorieën zijn */}
                {categories.length === 0 && (
                <TableRow>
                    <TableCell
                    colSpan={4}
                    className="py-6 text-center text-gray-500"
                    >
                    Geen categorieën gevonden
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>

        {/* Modal voor het aanmaken van een categorie */}
        <CreateCategoryDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
        />

        {/* Modal voor het bewerken van een categorie */}
        <EditCategoryDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            category={selectedCategory}
        />
        </section>
    )
    }