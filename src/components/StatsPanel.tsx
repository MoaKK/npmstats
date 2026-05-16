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
  { label: "Day", key: "daily" },
  { label: "Week", key: "weekly" },
  { label: "Month", key: "monthly" },
  { label: "Year", key: "yearly" },
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={period}
            onValueChange={(val) => val && setPeriod(val as PeriodKey)}
          >
            {periods.map(({ label, key }) => (
              <ToggleGroupItem key={key} value={key}>
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
