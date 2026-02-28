type TextAreaProps={
    value: string
    onChange: (value:string) => void
    placeholder ?: string
    rows ?: number
}

export function TextArea({
    value,
    onChange,
    placeholder, 
    rows = 4,
}: TextAreaProps){
    return(
        <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border rounded p-3 resize-none focus:ring-2 focus:ring-black"
        />
    )
}