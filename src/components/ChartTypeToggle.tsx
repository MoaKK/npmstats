"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ChartType = "bar" | "line";

type ChartTypeToggleProps = {
  value: ChartType;
  onChange: (value: ChartType) => void;
};

function ChartTypeToggle({ value, onChange }: ChartTypeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={value}
      onValueChange={(val) => val && onChange(val as ChartType)}
    >
      <ToggleGroupItem value="bar" className="h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm">Bar</ToggleGroupItem>
      <ToggleGroupItem value="line" className="h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm">Line</ToggleGroupItem>
    </ToggleGroup>
  );
}

export type { ChartType };
export { ChartTypeToggle };
