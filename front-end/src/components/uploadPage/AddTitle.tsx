"use client"

import{Card, CardHeader, CardTitle, CardContent} from "@/src/components/ui/card"
import {Input} from "@/src/components/ui/input"

type AddTitleProps={
    value?: string
    onChange?: (value: string) => void
}

export default function AddTitle({
    value="", 
    onChange,
}: AddTitleProps){
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    Naam Product
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Input
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder="Voer naam van het product in..."
                />
            </CardContent>
        </Card>
    )
}
