import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

interface TimeFormatSelectorProps {
    timeFormatChange: (value: "12" | "24") => void;
    timeFormatValue: string;
}

export default function TimeFormatSelector({timeFormatChange, timeFormatValue}: TimeFormatSelectorProps) {
    const handleTimeFormatChange = (value: "12" | "24") => {
        timeFormatChange(value);
    }

    return (
        <div className="flex items-center space-x-4 mb-8">
            <Label htmlFor="timeFormat"
                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Time Format
            </Label>
            <Select defaultValue={timeFormatValue} onValueChange={handleTimeFormatChange}>
                <SelectTrigger id="timeFormat" className="w-[180px]">
                    <SelectValue placeholder="Select time format"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="24">24-hour</SelectItem>
                    <SelectItem value="12">12-hour</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}