"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChartTypeToggle } from "@/components/ChartTypeToggle";
import { DownloadChart } from "@/components/DownloadChart";
import type { ChartType } from "@/components/ChartTypeToggle";
import type { PackageStats } from "@/types/npm";

type PeriodKey = keyof PackageStats;

const periods: { label: string; key: PeriodKey }[] = [
  { label: "Last day", key: "daily" },
  { label: "Last week", key: "weekly" },
  { label: "Last month", key: "monthly" },
  { label: "Last year", key: "yearly" },
];

type StatsPanelProps = {
  stats: PackageStats;
  packageName: string;
};

function StatsPanel({ stats, packageName }: StatsPanelProps) {
  const [period, setPeriod] = useState<PeriodKey>("weekly");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const currentPeriodLabel = periods.find((p) => p.key === period)?.label ?? period;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={period}
            onValueChange={(val) => val && setPeriod(val as PeriodKey)}
            className="w-full flex-wrap justify-start sm:w-auto"
          >
            {periods.map(({ label, key }) => (
              <ToggleGroupItem key={key} value={key} className="h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm">
                {label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ChartTypeToggle value={chartType} onChange={setChartType} />
        </div>
      </CardHeader>
      <CardContent>
        <DownloadChart
          data={stats[period]}
          chartType={chartType}
          ariaLabel={`${packageName} downloads, last ${currentPeriodLabel.toLowerCase()}`}
        />
      </CardContent>
    </Card>
  );
}

export { StatsPanel };
