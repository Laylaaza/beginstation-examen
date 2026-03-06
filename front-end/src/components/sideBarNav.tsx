"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { Button } from "@/src/components/ui/button"

import {
    LayoutDashboard,
    FolderTree,
    Package,
    LogOut,
    } from "lucide-react"

    export default function SideBarNav() {
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
    ]

    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-white p-4">
        
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
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

        {/* Logout button at bottom */}
        <div className="mt-auto pt-6">
            <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700"
            >
            <LogOut className="h-4 w-4" />
            Afmelden
            </Button>
        </div>

        </aside>
    )
}