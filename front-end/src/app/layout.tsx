import SideBarNav from "../components/sideBarNav"
import "./globals.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return(
<html lang="en">
    <body>
        <div className="flex min-h-screen bg-background">
            <SideBarNav />
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    </body>
</html>
    )
}