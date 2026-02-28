"use client"

import Image from "next/image"
import {useRouter} from "next/navigation"

import{Table, TableHeader, TableBody, TableRow, TableHead, TableCell,} from "@/src/components/ui/table"

import {Button} from "@/src/components/ui/button"
import {Badge} from "@/src/components/ui/badge"
import {Pencil, Trash2, Plus} from "lucide-react"

export default function ProductsPage(){
    const router = useRouter()

    const products = [
    {
      name: "Canvas tas smiley",
      category: "Herbruikbare tassen",
      price: 5,
      status: "actief",
      image: "/products/tas.png",
    },
    {
      name: "Herbruikbare diepvrieszakken",
      category: "Recyclen thuis",
      price: 12,
      status: "actief",
      image: "/products/zakken.png",
    },
    {
      name: "Mini prullenbak",
      category: "Recyclen kantoor",
      price: 30,
      status: "actief",
      image: "/products/prullenbak.png",
    },
  ]

    return(
        <section className="space-y-6">

        {/* HEADERRRRR */}
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
                Producten
            </h1>

            <Button
                className="gap-2"
                onClick={() => router.push("/upload")}
            >
                <Plus className= "h-4 w-4" />
                    Voeg product toe
            </Button>
        </div>

        {/* TABLEEEEE */}
        <div className="rounded-xl border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Afb.</TableHead>
                        <TableHead>Productnaam</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>Prijs</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="h-10 w-10 overflow-hidden rounded-md border">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                            </TableCell>

                            <TableCell className="font-medium">
                                {product.name}
                            </TableCell>

                            <TableCell>
                                {product.category}
                            </TableCell>

                            <TableCell>
                                €{product.price}
                            </TableCell>

                            <TableCell>
                                <Badge 
                                    variant={
                                        product.status === "actief"
                                        ? "default"
                                        : "secondary"
                                    }
                                >
                                    {product.status}
                                </Badge>
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button size="icon" variant="ghost">
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button size="icon" variant="ghost">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </section>
    )
}