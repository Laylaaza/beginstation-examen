"use client"

import Link from "next/link"
import Image from "next/image"
import {usePathname} from "next/navigation"

import {Button} from "@/components/ui/button"

import {
    LayoutDashboard,
    FolderTree,
    Package,
    Upload,
} from "lucide-react"

export default function SideBarNav(){
    const pathname = usePathname()

    const navItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "Categorieën",
            href: "/categories",
            icon: FolderTree,
        },
        {
            label: "Producten",
            href: "/products",
            icon: Package,
        },
        {
            label: "Upload",
            href: "/upload",
            icon: Upload,
        },                
    ]

    return(
        <aside className="flex h-screen w-64 flex-col border-r bg-white p-4">

            <div className="mb-8 flex justify-center">
                <Link href="/dashboard">
                    <Image
                        src="/2BLogoTrans.png"
                        alt="2B Green Logo"
                        width={150}
                        height={20}
                    />
                </Link>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname == item.href
                    const Icon = item.icon

                    return(
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className="w-full justify-start gap-3"
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Button>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}