import { Label } from "./ui/label"

const RequiredLabel = ({ label }: { label: string }) => {
    return (
        <Label className="flex items-center gap-x-1">
            {label}
            <span className="text-red-500">*</span>
        </Label>
    )
}

export default RequiredLabel