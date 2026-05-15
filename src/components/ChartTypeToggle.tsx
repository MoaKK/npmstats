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
      value={value}
      onValueChange={(val) => val && onChange(val as ChartType)}
    >
      <ToggleGroupItem value="bar">Bar</ToggleGroupItem>
      <ToggleGroupItem value="line">Line</ToggleGroupItem>
    </ToggleGroup>
  );
}

export type { ChartType };
export { ChartTypeToggle };
