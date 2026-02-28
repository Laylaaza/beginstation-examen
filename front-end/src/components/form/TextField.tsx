type TextFieldProps ={
    value: string
    onChange: (value: string) => void
    placeholder ?: string
    type ?: "text" | "number"
}

export function TextField({
    value,
    onChange,
    placeholder,
    type="text",
}: TextFieldProps){
    return(
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
    )
}