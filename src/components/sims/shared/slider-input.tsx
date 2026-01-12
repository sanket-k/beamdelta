"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SliderInputProps {
    /** Label for the control */
    label: string;
    /** Current value */
    value: number;
    /** Change handler */
    onChange: (value: number) => void;
    /** Minimum value */
    min: number;
    /** Maximum value */
    max: number;
    /** Step increment */
    step?: number;
    /** Format function for display */
    formatValue?: (value: number) => string;
    /** Format function for min/max labels */
    formatLabel?: (value: number) => string;
    /** Show numeric input field */
    showInput?: boolean;
    /** Unit suffix */
    unit?: string;
    /** Additional className */
    className?: string;
    /** Called when user starts dragging */
    onDragStart?: () => void;
    /** Called when user stops dragging */
    onDragEnd?: () => void;
}

/**
 * Labeled slider component with optional numeric input.
 * Includes micro-interactions and min/max labels.
 */
export function SliderInput({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    formatValue,
    formatLabel,
    showInput = false,
    unit,
    className,
    onDragStart,
    onDragEnd,
}: SliderInputProps) {
    const displayValue = formatValue ? formatValue(value) : value.toString();
    const minLabel = formatLabel ? formatLabel(min) : min.toString();
    const maxLabel = formatLabel ? formatLabel(max) : max.toString();

    const handleSliderChange = (values: number[]) => {
        onChange(values[0]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue)) {
            onChange(Math.min(Math.max(newValue, min), max));
        }
    };

    return (
        <div className={cn("space-y-3", className)}>
            {/* Label Row */}
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <div className="flex items-center gap-2">
                    {showInput ? (
                        <Input
                            type="number"
                            value={value}
                            onChange={handleInputChange}
                            min={min}
                            max={max}
                            step={step}
                            className="w-24 h-8 text-right font-mono text-sm"
                            inputMode="numeric"
                        />
                    ) : (
                        <span className="text-sm font-mono text-accent font-medium">
                            {displayValue}
                            {unit && <span className="text-muted-foreground ml-1">{unit}</span>}
                        </span>
                    )}
                </div>
            </div>

            {/* Slider */}
            <Slider
                value={[value]}
                onValueChange={handleSliderChange}
                min={min}
                max={max}
                step={step}
                onPointerDown={onDragStart}
                onPointerUp={onDragEnd}
                className={cn(
                    "[&_[role=slider]]:h-4 [&_[role=slider]]:w-4",
                    "[&_[role=slider]]:transition-transform [&_[role=slider]]:duration-[var(--duration-fast)]",
                    "[&_[role=slider]]:hover:scale-110 [&_[role=slider]]:active:scale-125",
                    "[&_[role=slider]]:bg-accent [&_[role=slider]]:border-0",
                    "[&_.bg-primary]:bg-accent"
                )}
            />

            {/* Min/Max Labels */}
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </div>
    );
}
