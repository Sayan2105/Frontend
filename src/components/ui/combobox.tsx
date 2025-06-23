"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Option = {
    label: string
    value: string
}

type Props = {
    placeholder: string
    options: Option[]
    onValueChange: (value: string) => void
    defaultValue?: string
    width?: string
}

export function Combobox({ placeholder, options, onValueChange, defaultValue, width }: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue ?? "")

    const handleSelect = (selected: string) => {
        const newValue = selected === value ? "" : selected
        setValue(newValue)
        onValueChange(newValue)
        setOpen(false)
    }

    // if (value) onValueChange(value)
    if (defaultValue) onValueChange(defaultValue)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    role="combobox"
                    aria-expanded={open}
                    className={cn("flex items-center w-[200px] justify-between border border-input py-[4.5px] px-2.5 rounded-md", width)}
                >
                    {value
                        ? options.find((item) => item.value === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-[200px] p-0 z-[99999]", width)}>
                <Command>
                    <CommandInput
                        placeholder="Search..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No result found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value + '-' + item.label} // search value
                                    onSelect={() => handleSelect(item.value)}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
