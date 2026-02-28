"use client"

import{Card, CardHeader, CardTitle, CardContent,} from "@/src/components/ui/card"
import {Badge} from "@/src/components/ui/badge"
import{Package, LayoutGrid, Upload, Users,} from "lucide-react"

export default function DashboardPage() {
    const stats = [
        {
            title: "Totaal Producten",
            value: 24,
            change: "+12%",
            icon: Package,
        },
        {
            title: "Totaal Categorieën",
            value: 6,
            change: "+2",
            icon: LayoutGrid,
        },
        {
            title: "Recente Uploads",
            value: 12,
            change: "+4",
            icon: Upload,
        },
        {
            title: "Recente Bezoekers",
            value: "1,024",
            change: "+36%",
            icon: Users,
        },
    ]

    return (
        <section className="space-y-6">
            <h1 className="text-xl font-semibold">
                Dashboard Overzicht
            </h1>

            {/* STATISTIEKEN KAARTEN */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat,index) => {
                    const Icon = stat.icon

                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                </div>

                                <Badge variant="secondary">
                                    {stat.change}
                                </Badge>
                            </CardHeader>

                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stat.value}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/*ONDERKANT PAGINA*/}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="min-h[250px]">
                    <CardHeader>
                        Recente Producten
                    </CardHeader>
                    <CardContent>
                        KOMT LATER!
                    </CardContent>
                </Card>

                <Card className="min-h-[250px]">
                    <CardHeader>
                        Categorie Overzicht
                    </CardHeader>
                    <CardContent>
                        KOMT LATER!
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}