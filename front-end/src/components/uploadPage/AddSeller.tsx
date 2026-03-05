"use client"

import {Card, CardHeader, CardTitle, CardContent} from "@/src/components/ui/card"
import {Input} from "@/src/components/ui/input"

export default function AddSeller({
    defaultValue = "",
}: {
    defaultValue: string
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Naam Verkoper (verplicht)</CardTitle>
            </CardHeader>

            <CardContent>
                <Input
                    name="seller"
                    defaultValue={defaultValue}
                    placeholder="Voer naam van de verkoper in..."
                />
            </CardContent>
        </Card>
    )
}