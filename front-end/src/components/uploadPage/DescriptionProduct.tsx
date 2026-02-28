"use client"

import {Card, CardHeader, CardTitle, CardContent,} from "@/src/components/ui/card"

import { Textarea } from "@/src/components/ui/textarea"

type Props={
    value?: string
    onChange?: (value: string) => void
}

export default function DescriptionProduct({
    value="",
    onChange,
}: Props){
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    Beschrijving Product
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Textarea
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder="Voer productbeschrijving in..."
                    className="min-h-36 resize-none"
                />
            </CardContent>
        </Card>
    )
}