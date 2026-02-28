"use client"

import {useState} from "react"
import {Card, CardHeader, CardTitle, CardContent,} from "@/src/components/ui/card"
import {Input} from "@/src/components/ui/input"

export default function AddPrice() {
    const [price, setPrice] = useState("")

    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    Prijs
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                />
            </CardContent>
        </Card>
    )
}