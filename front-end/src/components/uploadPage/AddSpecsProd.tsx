"use client"

import {useState} from "react"
import {Card, CardHeader, CardTitle, CardContent,} from "@/src/components/ui/card"
import {Input} from "@/src/components/ui/input"

export default function AddSpecsProd(){
    const [specs, setSpecs] = useState([
        {key: "", value: ""},
        {key: "", value: ""},
        {key: "", value: ""},
    ])

    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    Specificaties
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {specs.map((spec, index) => (
                        <div key={index} className="contents">
                        <Input
                            value={spec.key}
                            onChange={(e) => {
                                const next = [...specs]
                                next[index].key = e.target.value
                                setSpecs(next)
                            }}
                            placeholder="Specificaties"
                        />

                        <Input
                            value={spec.value}
                            onChange={(e) => {
                                const next = [...specs]
                                next[index].value = e.target.value
                                setSpecs(next)
                            }}
                            placeholder="Waarde"
                        />
                    </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}