"use client"

import {useState} from "react"

import {Table, TableHeader, TableBody, TableRow, TableHead, TableCell,} from "@/src/components/ui/table"
import {Button} from "@/src/components/ui/button"
import {Badge} from "@/src/components/ui/badge"
import {Pencil, Trash2, Plus} from "lucide-react"

import CreateCategoryDialog from "../../components/modals/CreateCategoryDialog"
import EditCategoryDialog from "@/src/components/modals/EditCategoryDialog"
import DeleteCategoryDialog from "@/src/components/modals/DeleteCategoryDialog"

type Category={
    id: number
    name: string
    status: "ACTIEF" | "DRAFT" | "INACTIEF"
    _count: {
        products: number
    }
}

export default function CategoriesClient({
    categories,
}: {
    categories: Category[]
}) {
    const [createOpen, setCreateOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState (false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    return(
        <section className="space-y-6">
            {/*HIER KOMT DE HEADER*/}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                    Categorieën
                </h1>

                <Button 
                    className="gap-2"
                    onClick={() => setCreateOpen(true)}
                >

                    <Plus className="h-4 w-4" />
                    Voeg Categorie Toe
                </Button>
            </div>

            {/* TABLE VOOR CATEGORIEËN */}
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
                                <TableCell className="font-medium">
                                    {category.name}
                                </TableCell>

                                <TableCell>
                                    {category._count.products}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            category.status === "ACTIEF"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                        }
                                    >
                                        {category.status.toLowerCase()}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                    
                                    {/*EDIT KNOP*/}
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

                                    {/* VERWIJDER KNOP*/}
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => {
                                            setSelectedCategory(category)
                                            setDeleteOpen(true)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {categories.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-6 text-gray-500"
                                >
                                    Geen categorieën gevonden
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </div>
        
        {/* MODALS */}
        <CreateCategoryDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
        />

        <EditCategoryDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            category={selectedCategory}
        />

        <DeleteCategoryDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            category={selectedCategory}
        />

        </section>
    )
}